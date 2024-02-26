@echo off
cd /d %~dp0
ffmpeg\bin\ffmpeg.exe -i input\input.mkv -c:v libx264 -c:a aac -map 0 -f segment -segment_time 10 -segment_list output\output.m3u8 -segment_list_type m3u8 output\output_%%03d.ts
pause
