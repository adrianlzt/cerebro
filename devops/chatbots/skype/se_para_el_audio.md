https://wiki.archlinux.org/index.php/Skype#Skype_sounds_stops_media_player_or_other_sound_sources

/etc/pulse/default.pa
#load-module module-role-cork


Para aplicar de inmediato:
pactl unload-module module-role-cork
