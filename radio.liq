# 1. Define the sources
youversion_bible = playlist(mode="randomize", reload=1, reload_mode="watch", "/playlist/bible/youversion")
alex_bible = playlist(mode="randomize", reload=1, reload_mode="watch", "/playlist/bible/alexander_scourby")
plain_bible = playlist(mode="randomize", reload=1, reload_mode="watch", "/playlist/bible/default")
lullabites = playlist(mode="randomize", reload=1, reload_mode="watch", "/playlist/lullabites")

# 2. Make them safe
youversion_radio = mksafe(youversion_bible)
alex_radio = mksafe(alex_bible)
plain_radio = mksafe(plain_bible)
lullabites_radio = mksafe(lullabites)

# 3. Output to Icecast (Ensure the 'radio' variable matches the source!)
output.icecast(%mp3(bitrate=128),
  host = "icecast", port = 8000,
  password = "youshallnotpass", mount = "youversion",
  name = "YouVersion Bible Radio",
  youversion_radio)

output.icecast(%mp3(bitrate=128),
  host = "icecast", port = 8000,
  password = "youshallnotpass", mount = "alex",
  name = "Alexander Scourby Bible Radio",
  alex_radio)

output.icecast(%mp3(bitrate=128),
  host = "icecast", port = 8000,
  password = "youshallnotpass", mount = "plain",
  name = "Plain Bible Radio",
  plain_radio)

output.icecast(%mp3(bitrate=128),
  host = "icecast", port = 8000,
  password = "youshallnotpass", mount = "lullabites",
  name = "Lullabites Radio",
  lullabites_radio)