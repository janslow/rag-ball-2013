if [[ -d "$1" ]]; then
  (cd $1; python -m SimpleHTTPServer)
else
  if [[ -n "$1" ]]; then
    echo "$1 is not a directory"
  else
    echo "No directory specified"
  fi
  echo "Usage: ./webserver.sh directory"
fi
