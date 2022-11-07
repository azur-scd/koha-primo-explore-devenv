#!/bin/bash
 
# turn on bash's job control
set -m
   
# Start the primary process and put it in the background
./sh_scripts/global_install.sh &
   
# Start the helper process
./sh_scripts/npm_install.sh
   
# the my_helper_process might need to know how to wait on the
# primary process to start before it does its work and returns
   
   
# now we bring the primary process back into the foreground
# and leave it there
fg %1