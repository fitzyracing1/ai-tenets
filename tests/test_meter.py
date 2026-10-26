import json, os, subprocess, sys, tempfile, unittest
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from tenets_meter import Meter, decode4, decode8


class T(unittest.TestCase):
    def test_online(self):
        with Meter() as m:
            m.cost(usd=0.01); m.hop(); m.step(); m.claim(verified=True)
        self.assertEqual(m.code, "0000"); self.assertEqual(m.status, "AI online")
        self.assertEqual(m.byte, 0b01010100)

    def test_each_bit(self):
        m = Meter({"cost": 1}); m.cost(usd=5); self.assertEqual(m.code, "1000")
        m = Meter({"bridge": 1}); m.hop(2); self.assertEqual(m.code, "0100")
        m = Meter({"work": 2}); m.step(3); self.assertEqual(m.code, "0010")
        m = Meter(); m.claim(verified=False); self.assertEqual(m.code, "0001")
        self.assertIn("theory", m.status)

    def test_fully_dark_and_tokens(self):
        m = Meter({"cost": 1, "tokens": 100, "bridge": 1, "work": 1})
        m.cost(tokens=1000); m.hop(5); m.step(5); m.claim(); m.claim(); m.claim()
        self.assertEqual(m.code, "1111"); self.assertEqual(m.byte, 0xff)
        self.assertEqual(m.status, "fully dark")

    def test_decorator(self):
        meter = Meter()
        @meter
        def run():
            meter.step(); return 42
        self.assertEqual(run(), 42); self.assertEqual(run.meter.steps, 1)
        run(); self.assertEqual(meter.steps, 1)

    def test_decoders(self):
        self.assertEqual(decode4("0000")["status"], "AI online")
        d = decode8("0x12"); self.assertEqual(d["bridge"], "low"); self.assertEqual(d["code4"], "0001")

    def test_from_log_and_cli(self):
        log = {"limits": {"work": 2}, "events": [{"type": "step"}] * 3 + [{"type": "claim", "verified": True}]}
        self.assertEqual(Meter.from_log(log).code, "0010")
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
            json.dump(log, f)
        root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        out = subprocess.run([sys.executable, "-m", "tenets_meter", f.name], cwd=root, capture_output=True, text=True)
        self.assertEqual(out.returncode, 0); self.assertTrue(out.stdout.startswith("0010 0x"))
        s = subprocess.run([sys.executable, "-m", "tenets_meter", "--strict", f.name], cwd=root, capture_output=True, text=True)
        self.assertEqual(s.returncode, 1)


if __name__ == "__main__":
    unittest.main()
