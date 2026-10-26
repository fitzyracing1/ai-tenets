"""tenets-meter CLI: read a JSON run log (file or '-') and print its tenets code."""
import argparse
import json
import sys

from . import Meter


def main(argv=None):
    p = argparse.ArgumentParser(prog="tenets-meter", description=__doc__)
    p.add_argument("log", help="JSON run log path, or - for stdin")
    p.add_argument("--json", action="store_true", help="print the full report as JSON")
    p.add_argument("--strict", action="store_true", help="exit 1 unless the code is 0000")
    a = p.parse_args(argv)
    data = json.load(sys.stdin if a.log == "-" else open(a.log))
    m = Meter.from_log(data)
    r = m.report()
    print(json.dumps(r, indent=2) if a.json else "%s %s %s" % (r["code"], r["byte"], r["status"]))
    return 1 if a.strict and not m.online else 0
