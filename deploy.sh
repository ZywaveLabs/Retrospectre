#!/bin/bash
cd src/
meteor build deploy --architecture os.linux.x86_64
cd ..
expect nodechef.exp
