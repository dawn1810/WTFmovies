FFmpeg 64-bit static Windows build from www.gyan.dev

Version: 2024-02-01-git-94422871fc-full_build-www.gyan.dev

License: GPL v3

Source Code: https://github.com/FFmpeg/FFmpeg/commit/94422871fc

External Assets
frei0r plugins:   https://www.gyan.dev/ffmpeg/builds/ffmpeg-frei0r-plugins
lensfun database: https://www.gyan.dev/ffmpeg/builds/ffmpeg-lensfun-db

git-full build configuration: 

ARCH                      x86 (generic)
big-endian                no
runtime cpu detection     yes
standalone assembly       yes
x86 assembler             nasm
MMX enabled               yes
MMXEXT enabled            yes
3DNow! enabled            yes
3DNow! extended enabled   yes
SSE enabled               yes
SSSE3 enabled             yes
AESNI enabled             yes
AVX enabled               yes
AVX2 enabled              yes
AVX-512 enabled           yes
AVX-512ICL enabled        yes
XOP enabled               yes
FMA3 enabled              yes
FMA4 enabled              yes
i686 features enabled     yes
CMOV is fast              yes
EBX available             yes
EBP available             yes
debug symbols             yes
strip symbols             yes
optimize for size         no
optimizations             yes
static                    yes
shared                    no
postprocessing support    yes
network support           yes
threading support         pthreads
safe bitstream reader     yes
texi2html enabled         no
perl enabled              yes
pod2man enabled           yes
makeinfo enabled          yes
makeinfo supports HTML    yes
xmllint enabled           yes

External libraries:
avisynth                libgsm                  libsvtav1
bzlib                   libharfbuzz             libtheora
chromaprint             libilbc                 libtwolame
frei0r                  libjxl                  libuavs3d
gmp                     liblensfun              libvidstab
gnutls                  libmodplug              libvmaf
iconv                   libmp3lame              libvo_amrwbenc
ladspa                  libmysofa               libvorbis
libaom                  libopencore_amrnb       libvpx
libaribb24              libopencore_amrwb       libwebp
libaribcaption          libopenjpeg             libx264
libass                  libopenmpt              libx265
libbluray               libopus                 libxavs2
libbs2b                 libplacebo              libxml2
libcaca                 librav1e                libxvid
libcdio                 librist                 libzimg
libcodec2               librubberband           libzmq
libdav1d                libshaderc              libzvbi
libdavs2                libshine                lzma
libflite                libsnappy               mediafoundation
libfontconfig           libsoxr                 sdl2
libfreetype             libspeex                zlib
libfribidi              libsrt
libgme                  libssh

External libraries providing hardware acceleration:
amf                     dxva2                   nvenc
cuda                    ffnvcodec               opencl
cuda_llvm               libmfx                  vulkan
cuvid                   libvpl
d3d11va                 nvdec

Libraries:
avcodec                 avformat                swresample
avdevice                avutil                  swscale
avfilter                postproc

Programs:
ffmpeg                  ffplay                  ffprobe

Enabled decoders:
aac                     ftr                     pcm_vidc
aac_fixed               g2m                     pcx
aac_latm                g723_1                  pdv
aasc                    g729                    pfm
ac3                     gdv                     pgm
ac3_fixed               gem                     pgmyuv
acelp_kelvin            gif                     pgssub
adpcm_4xm               gremlin_dpcm            pgx
adpcm_adx               gsm                     phm
adpcm_afc               gsm_ms                  photocd
adpcm_agm               h261                    pictor
adpcm_aica              h263                    pixlet
adpcm_argo              h263i                   pjs
adpcm_ct                h263p                   png
adpcm_dtk               h264                    ppm
adpcm_ea                h264_cuvid              prores
adpcm_ea_maxis_xa       h264_qsv                prosumer
adpcm_ea_r1             hap                     psd
adpcm_ea_r2             hca                     ptx
adpcm_ea_r3             hcom                    qcelp
adpcm_ea_xas            hdr                     qdm2
adpcm_g722              hevc                    qdmc
adpcm_g726              hevc_cuvid              qdraw
adpcm_g726le            hevc_qsv                qoa
adpcm_ima_acorn         hnm4_video              qoi
adpcm_ima_alp           hq_hqa                  qpeg
adpcm_ima_amv           hqx                     qtrle
adpcm_ima_apc           huffyuv                 r10k
adpcm_ima_apm           hymt                    r210
adpcm_ima_cunning       iac                     ra_144
adpcm_ima_dat4          idcin                   ra_288
adpcm_ima_dk3           idf                     ralf
adpcm_ima_dk4           iff_ilbm                rasc
adpcm_ima_ea_eacs       ilbc                    rawvideo
adpcm_ima_ea_sead       imc                     realtext
adpcm_ima_iss           imm4                    rka
adpcm_ima_moflex        imm5                    rl2
adpcm_ima_mtf           indeo2                  roq
adpcm_ima_oki           indeo3                  roq_dpcm
adpcm_ima_qt            indeo4                  rpza
adpcm_ima_rad           indeo5                  rscc
adpcm_ima_smjpeg        interplay_acm           rtv1
adpcm_ima_ssi           interplay_dpcm          rv10
adpcm_ima_wav           interplay_video         rv20
adpcm_ima_ws            ipu                     rv30
adpcm_ms                jacosub                 rv40
adpcm_mtaf              jpeg2000                s302m
adpcm_psx               jpegls                  sami
adpcm_sbpro_2           jv                      sanm
adpcm_sbpro_3           kgv1                    sbc
adpcm_sbpro_4           kmvc                    scpr
adpcm_swf               lagarith                screenpresso
adpcm_thp               lead                    sdx2_dpcm
adpcm_thp_le            libaom_av1              sga
adpcm_vima              libaribb24              sgi
adpcm_xa                libaribcaption          sgirle
adpcm_xmd               libcodec2               sheervideo
adpcm_yamaha            libdav1d                shorten
adpcm_zork              libdavs2                simbiosis_imx
agm                     libgsm                  sipr
aic                     libgsm_ms               siren
alac                    libilbc                 smackaud
alias_pix               libjxl                  smacker
als                     libopencore_amrnb       smc
amrnb                   libopencore_amrwb       smvjpeg
amrwb                   libopus                 snow
amv                     libspeex                sol_dpcm
anm                     libuavs3d               sonic
ansi                    libvorbis               sp5x
anull                   libvpx_vp8              speedhq
apac                    libvpx_vp9              speex
ape                     libzvbi_teletext        srgc
apng                    loco                    srt
aptx                    lscr                    ssa
aptx_hd                 m101                    stl
arbc                    mace3                   subrip
argo                    mace6                   subviewer
ass                     magicyuv                subviewer1
asv1                    mdec                    sunrast
asv2                    media100                svq1
atrac1                  metasound               svq3
atrac3                  microdvd                tak
atrac3al                mimic                   targa
atrac3p                 misc4                   targa_y216
atrac3pal               mjpeg                   tdsc
atrac9                  mjpeg_cuvid             text
aura                    mjpeg_qsv               theora
aura2                   mjpegb                  thp
av1                     mlp                     tiertexseqvideo
av1_cuvid               mmvideo                 tiff
av1_qsv                 mobiclip                tmv
avrn                    motionpixels            truehd
avrp                    movtext                 truemotion1
avs                     mp1                     truemotion2
avui                    mp1float                truemotion2rt
ayuv                    mp2                     truespeech
bethsoftvid             mp2float                tscc
bfi                     mp3                     tscc2
bink                    mp3adu                  tta
binkaudio_dct           mp3adufloat             twinvq
binkaudio_rdft          mp3float                txd
bintext                 mp3on4                  ulti
bitpacked               mp3on4float             utvideo
bmp                     mpc7                    v210
bmv_audio               mpc8                    v210x
bmv_video               mpeg1_cuvid             v308
bonk                    mpeg1video              v408
brender_pix             mpeg2_cuvid             v410
c93                     mpeg2_qsv               vb
cavs                    mpeg2video              vble
cbd2_dpcm               mpeg4                   vbn
ccaption                mpeg4_cuvid             vc1
cdgraphics              mpegvideo               vc1_cuvid
cdtoons                 mpl2                    vc1_qsv
cdxl                    msa1                    vc1image
cfhd                    mscc                    vcr1
cinepak                 msmpeg4v1               vmdaudio
clearvideo              msmpeg4v2               vmdvideo
cljr                    msmpeg4v3               vmix
cllc                    msnsiren                vmnc
comfortnoise            msp2                    vnull
cook                    msrle                   vorbis
cpia                    mss1                    vp3
cri                     mss2                    vp4
cscd                    msvideo1                vp5
cyuv                    mszh                    vp6
dca                     mts2                    vp6a
dds                     mv30                    vp6f
derf_dpcm               mvc1                    vp7
dfa                     mvc2                    vp8
dfpwm                   mvdv                    vp8_cuvid
dirac                   mvha                    vp8_qsv
dnxhd                   mwsc                    vp9
dolby_e                 mxpeg                   vp9_cuvid
dpx                     nellymoser              vp9_qsv
dsd_lsbf                notchlc                 vplayer
dsd_lsbf_planar         nuv                     vqa
dsd_msbf                on2avc                  vqc
dsd_msbf_planar         opus                    vvc
dsicinaudio             osq                     wady_dpcm
dsicinvideo             paf_audio               wavarc
dss_sp                  paf_video               wavpack
dst                     pam                     wbmp
dvaudio                 pbm                     wcmv
dvbsub                  pcm_alaw                webp
dvdsub                  pcm_bluray              webvtt
dvvideo                 pcm_dvd                 wmalossless
dxa                     pcm_f16le               wmapro
dxtory                  pcm_f24le               wmav1
dxv                     pcm_f32be               wmav2
eac3                    pcm_f32le               wmavoice
eacmv                   pcm_f64be               wmv1
eamad                   pcm_f64le               wmv2
eatgq                   pcm_lxf                 wmv3
eatgv                   pcm_mulaw               wmv3image
eatqi                   pcm_s16be               wnv1
eightbps                pcm_s16be_planar        wrapped_avframe
eightsvx_exp            pcm_s16le               ws_snd1
eightsvx_fib            pcm_s16le_planar        xan_dpcm
escape124               pcm_s24be               xan_wc3
escape130               pcm_s24daud             xan_wc4
evrc                    pcm_s24le               xbin
exr                     pcm_s24le_planar        xbm
fastaudio               pcm_s32be               xface
ffv1                    pcm_s32le               xl
ffvhuff                 pcm_s32le_planar        xma1
ffwavesynth             pcm_s64be               xma2
fic                     pcm_s64le               xpm
fits                    pcm_s8                  xsub
flac                    pcm_s8_planar           xwd
flashsv                 pcm_sga                 y41p
flashsv2                pcm_u16be               ylc
flic                    pcm_u16le               yop
flv                     pcm_u24be               yuv4
fmvc                    pcm_u24le               zero12v
fourxm                  pcm_u32be               zerocodec
fraps                   pcm_u32le               zlib
frwu                    pcm_u8                  zmbv

Enabled encoders:
a64multi                hevc_qsv                pcm_u16be
a64multi5               huffyuv                 pcm_u16le
aac                     jpeg2000                pcm_u24be
aac_mf                  jpegls                  pcm_u24le
ac3                     libaom_av1              pcm_u32be
ac3_fixed               libcodec2               pcm_u32le
ac3_mf                  libgsm                  pcm_u8
adpcm_adx               libgsm_ms               pcm_vidc
adpcm_argo              libilbc                 pcx
adpcm_g722              libjxl                  pfm
adpcm_g726              libmp3lame              pgm
adpcm_g726le            libopencore_amrnb       pgmyuv
adpcm_ima_alp           libopenjpeg             phm
adpcm_ima_amv           libopus                 png
adpcm_ima_apm           librav1e                ppm
adpcm_ima_qt            libshine                prores
adpcm_ima_ssi           libspeex                prores_aw
adpcm_ima_wav           libsvtav1               prores_ks
adpcm_ima_ws            libtheora               qoi
adpcm_ms                libtwolame              qtrle
adpcm_swf               libvo_amrwbenc          r10k
adpcm_yamaha            libvorbis               r210
alac                    libvpx_vp8              ra_144
alias_pix               libvpx_vp9              rawvideo
amv                     libwebp                 roq
anull                   libwebp_anim            roq_dpcm
apng                    libx264                 rpza
aptx                    libx264rgb              rv10
aptx_hd                 libx265                 rv20
ass                     libxavs2                s302m
asv1                    libxvid                 sbc
asv2                    ljpeg                   sgi
av1_amf                 magicyuv                smc
av1_nvenc               mjpeg                   snow
av1_qsv                 mjpeg_qsv               sonic
avrp                    mlp                     sonic_ls
avui                    movtext                 speedhq
ayuv                    mp2                     srt
bitpacked               mp2fixed                ssa
bmp                     mp3_mf                  subrip
cfhd                    mpeg1video              sunrast
cinepak                 mpeg2_qsv               svq1
cljr                    mpeg2video              targa
comfortnoise            mpeg4                   text
dca                     msmpeg4v2               tiff
dfpwm                   msmpeg4v3               truehd
dnxhd                   msrle                   tta
dpx                     msvideo1                ttml
dvbsub                  nellymoser              utvideo
dvdsub                  opus                    v210
dvvideo                 pam                     v308
dxv                     pbm                     v408
eac3                    pcm_alaw                v410
exr                     pcm_bluray              vbn
ffv1                    pcm_dvd                 vc2
ffvhuff                 pcm_f32be               vnull
fits                    pcm_f32le               vorbis
flac                    pcm_f64be               vp9_qsv
flashsv                 pcm_f64le               wavpack
flashsv2                pcm_mulaw               wbmp
flv                     pcm_s16be               webvtt
g723_1                  pcm_s16be_planar        wmav1
gif                     pcm_s16le               wmav2
h261                    pcm_s16le_planar        wmv1
h263                    pcm_s24be               wmv2
h263p                   pcm_s24daud             wrapped_avframe
h264_amf                pcm_s24le               xbm
h264_mf                 pcm_s24le_planar        xface
h264_nvenc              pcm_s32be               xsub
h264_qsv                pcm_s32le               xwd
hap                     pcm_s32le_planar        y41p
hdr                     pcm_s64be               yuv4
hevc_amf                pcm_s64le               zlib
hevc_mf                 pcm_s8                  zmbv
hevc_nvenc              pcm_s8_planar

Enabled hwaccels:
av1_d3d11va             hevc_dxva2              vc1_dxva2
av1_d3d11va2            hevc_nvdec              vc1_nvdec
av1_dxva2               hevc_vulkan             vp8_nvdec
av1_nvdec               mjpeg_nvdec             vp9_d3d11va
av1_vulkan              mpeg1_nvdec             vp9_d3d11va2
h264_d3d11va            mpeg2_d3d11va           vp9_dxva2
h264_d3d11va2           mpeg2_d3d11va2          vp9_nvdec
h264_dxva2              mpeg2_dxva2             wmv3_d3d11va
h264_nvdec              mpeg2_nvdec             wmv3_d3d11va2
h264_vulkan             mpeg4_nvdec             wmv3_dxva2
hevc_d3d11va            vc1_d3d11va             wmv3_nvdec
hevc_d3d11va2           vc1_d3d11va2

Enabled parsers:
aac                     dvdsub                  mpegaudio
aac_latm                evc                     mpegvideo
ac3                     flac                    opus
adx                     ftr                     png
amr                     g723_1                  pnm
av1                     g729                    qoi
avs2                    gif                     rv34
avs3                    gsm                     sbc
bmp                     h261                    sipr
cavsvideo               h263                    tak
cook                    h264                    vc1
cri                     hdr                     vorbis
dca                     hevc                    vp3
dirac                   ipu                     vp8
dnxhd                   jpeg2000                vp9
dolby_e                 jpegxl                  vvc
dpx                     misc4                   webp
dvaudio                 mjpeg                   xbm
dvbsub                  mlp                     xma
dvd_nav                 mpeg4video              xwd

Enabled demuxers:
aa                      idf                     pcm_mulaw
aac                     iff                     pcm_s16be
aax                     ifv                     pcm_s16le
ac3                     ilbc                    pcm_s24be
ac4                     image2                  pcm_s24le
ace                     image2_alias_pix        pcm_s32be
acm                     image2_brender_pix      pcm_s32le
act                     image2pipe              pcm_s8
adf                     image_bmp_pipe          pcm_u16be
adp                     image_cri_pipe          pcm_u16le
ads                     image_dds_pipe          pcm_u24be
adx                     image_dpx_pipe          pcm_u24le
aea                     image_exr_pipe          pcm_u32be
afc                     image_gem_pipe          pcm_u32le
aiff                    image_gif_pipe          pcm_u8
aix                     image_hdr_pipe          pcm_vidc
alp                     image_j2k_pipe          pdv
amr                     image_jpeg_pipe         pjs
amrnb                   image_jpegls_pipe       pmp
amrwb                   image_jpegxl_pipe       pp_bnk
anm                     image_pam_pipe          pva
apac                    image_pbm_pipe          pvf
apc                     image_pcx_pipe          qcp
ape                     image_pfm_pipe          qoa
apm                     image_pgm_pipe          r3d
apng                    image_pgmyuv_pipe       rawvideo
aptx                    image_pgx_pipe          realtext
aptx_hd                 image_phm_pipe          redspark
aqtitle                 image_photocd_pipe      rka
argo_asf                image_pictor_pipe       rl2
argo_brp                image_png_pipe          rm
argo_cvg                image_ppm_pipe          roq
asf                     image_psd_pipe          rpl
asf_o                   image_qdraw_pipe        rsd
ass                     image_qoi_pipe          rso
ast                     image_sgi_pipe          rtp
au                      image_sunrast_pipe      rtsp
av1                     image_svg_pipe          s337m
avi                     image_tiff_pipe         sami
avisynth                image_vbn_pipe          sap
avr                     image_webp_pipe         sbc
avs                     image_xbm_pipe          sbg
avs2                    image_xpm_pipe          scc
avs3                    image_xwd_pipe          scd
bethsoftvid             imf                     sdns
bfi                     ingenient               sdp
bfstm                   ipmovie                 sdr2
bink                    ipu                     sds
binka                   ircam                   sdx
bintext                 iss                     segafilm
bit                     iv8                     ser
bitpacked               ivf                     sga
bmv                     ivr                     shorten
boa                     jacosub                 siff
bonk                    jpegxl_anim             simbiosis_imx
brstm                   jv                      sln
c93                     kux                     smacker
caf                     kvag                    smjpeg
cavsvideo               laf                     smush
cdg                     libgme                  sol
cdxl                    libmodplug              sox
cine                    libopenmpt              spdif
codec2                  live_flv                srt
codec2raw               lmlm4                   stl
concat                  loas                    str
dash                    lrc                     subviewer
data                    luodat                  subviewer1
daud                    lvf                     sup
dcstr                   lxf                     svag
derf                    m4v                     svs
dfa                     matroska                swf
dfpwm                   mca                     tak
dhav                    mcc                     tedcaptions
dirac                   mgsts                   thp
dnxhd                   microdvd                threedostr
dsf                     mjpeg                   tiertexseq
dsicin                  mjpeg_2000              tmv
dss                     mlp                     truehd
dts                     mlv                     tta
dtshd                   mm                      tty
dv                      mmf                     txd
dvbsub                  mods                    ty
dvbtxt                  moflex                  usm
dxa                     mov                     v210
ea                      mp3                     v210x
ea_cdata                mpc                     vag
eac3                    mpc8                    vc1
epaf                    mpegps                  vc1t
evc                     mpegts                  vividas
ffmetadata              mpegtsraw               vivo
filmstrip               mpegvideo               vmd
fits                    mpjpeg                  vobsub
flac                    mpl2                    voc
flic                    mpsub                   vpk
flv                     msf                     vplayer
fourxm                  msnwc_tcp               vqf
frm                     msp                     vvc
fsb                     mtaf                    w64
fwse                    mtv                     wady
g722                    musx                    wav
g723_1                  mv                      wavarc
g726                    mvi                     wc3
g726le                  mxf                     webm_dash_manifest
g729                    mxg                     webvtt
gdv                     nc                      wsaud
genh                    nistsphere              wsd
gif                     nsp                     wsvqa
gsm                     nsv                     wtv
gxf                     nut                     wv
h261                    nuv                     wve
h263                    obu                     xa
h264                    ogg                     xbin
hca                     oma                     xmd
hcom                    osq                     xmv
hevc                    paf                     xvag
hls                     pcm_alaw                xwma
hnm                     pcm_f32be               yop
iamf                    pcm_f32le               yuv4mpegpipe
ico                     pcm_f64be
idcin                   pcm_f64le

Enabled muxers:
a64                     h261                    pcm_s16le
ac3                     h263                    pcm_s24be
ac4                     h264                    pcm_s24le
adts                    hash                    pcm_s32be
adx                     hds                     pcm_s32le
aiff                    hevc                    pcm_s8
alp                     hls                     pcm_u16be
amr                     iamf                    pcm_u16le
amv                     ico                     pcm_u24be
apm                     ilbc                    pcm_u24le
apng                    image2                  pcm_u32be
aptx                    image2pipe              pcm_u32le
aptx_hd                 ipod                    pcm_u8
argo_asf                ircam                   pcm_vidc
argo_cvg                ismv                    psp
asf                     ivf                     rawvideo
asf_stream              jacosub                 rcwt
ass                     kvag                    rm
ast                     latm                    roq
au                      lrc                     rso
avi                     m4v                     rtp
avif                    matroska                rtp_mpegts
avm2                    matroska_audio          rtsp
avs2                    md5                     sap
avs3                    microdvd                sbc
bit                     mjpeg                   scc
caf                     mkvtimestamp_v2         segafilm
cavsvideo               mlp                     segment
chromaprint             mmf                     smjpeg
codec2                  mov                     smoothstreaming
codec2raw               mp2                     sox
crc                     mp3                     spdif
dash                    mp4                     spx
data                    mpeg1system             srt
daud                    mpeg1vcd                stream_segment
dfpwm                   mpeg1video              streamhash
dirac                   mpeg2dvd                sup
dnxhd                   mpeg2svcd               swf
dts                     mpeg2video              tee
dv                      mpeg2vob                tg2
eac3                    mpegts                  tgp
evc                     mpjpeg                  truehd
f4v                     mxf                     tta
ffmetadata              mxf_d10                 ttml
fifo                    mxf_opatom              uncodedframecrc
fifo_test               null                    vc1
filmstrip               nut                     vc1t
fits                    obu                     voc
flac                    oga                     vvc
flv                     ogg                     w64
framecrc                ogv                     wav
framehash               oma                     webm
framemd5                opus                    webm_chunk
g722                    pcm_alaw                webm_dash_manifest
g723_1                  pcm_f32be               webp
g726                    pcm_f32le               webvtt
g726le                  pcm_f64be               wsaud
gif                     pcm_f64le               wtv
gsm                     pcm_mulaw               wv
gxf                     pcm_s16be               yuv4mpegpipe

Enabled protocols:
async                   http                    rtmp
bluray                  httpproxy               rtmpe
cache                   https                   rtmps
concat                  icecast                 rtmpt
concatf                 ipfs_gateway            rtmpte
crypto                  ipns_gateway            rtmpts
data                    librist                 rtp
fd                      libsrt                  srtp
ffrtmpcrypt             libssh                  subfile
ffrtmphttp              libzmq                  tcp
file                    md5                     tee
ftp                     mmsh                    tls
gopher                  mmst                    udp
gophers                 pipe                    udplite
hls                     prompeg

Enabled filters:
a3dscope                datascope               pad
aap                     dblur                   pad_opencl
abench                  dcshift                 pal100bars
abitscope               dctdnoiz                pal75bars
acompressor             ddagrab                 palettegen
acontrast               deband                  paletteuse
acopy                   deblock                 pan
acrossfade              decimate                perms
acrossover              deconvolve              perspective
acrusher                dedot                   phase
acue                    deesser                 photosensitivity
addroi                  deflate                 pixdesctest
adeclick                deflicker               pixelize
adeclip                 deinterlace_qsv         pixscope
adecorrelate            dejudder                pp
adelay                  delogo                  pp7
adenorm                 derain                  premultiply
aderivative             deshake                 prewitt
adrawgraph              deshake_opencl          prewitt_opencl
adrc                    despill                 program_opencl
adynamicequalizer       detelecine              pseudocolor
adynamicsmooth          dialoguenhance          psnr
aecho                   dilation                pullup
aemphasis               dilation_opencl         qp
aeval                   displace                random
aevalsrc                dnn_classify            readeia608
aexciter                dnn_detect              readvitc
afade                   dnn_processing          realtime
afdelaysrc              doubleweave             remap
afftdn                  drawbox                 remap_opencl
afftfilt                drawgraph               removegrain
afifo                   drawgrid                removelogo
afir                    drawtext                repeatfields
afireqsrc               drmeter                 replaygain
afirsrc                 dynaudnorm              reverse
aformat                 earwax                  rgbashift
afreqshift              ebur128                 rgbtestsrc
afwtdn                  edgedetect              roberts
agate                   elbg                    roberts_opencl
agraphmonitor           entropy                 rotate
ahistogram              epx                     rubberband
aiir                    eq                      sab
aintegral               equalizer               scale
ainterleave             erosion                 scale2ref
alatency                erosion_opencl          scale_cuda
alimiter                estdif                  scale_qsv
allpass                 exposure                scale_vulkan
allrgb                  extractplanes           scdet
allyuv                  extrastereo             scharr
aloop                   fade                    scroll
alphaextract            feedback                segment
alphamerge              fftdnoiz                select
amerge                  fftfilt                 selectivecolor
ametadata               field                   sendcmd
amix                    fieldhint               separatefields
amovie                  fieldmatch              setdar
amplify                 fieldorder              setfield
amultiply               fifo                    setparams
anequalizer             fillborders             setpts
anlmdn                  find_rect               setrange
anlmf                   firequalizer            setsar
anlms                   flanger                 settb
anoisesrc               flip_vulkan             shear
anull                   flite                   showcqt
anullsink               floodfill               showcwt
anullsrc                format                  showfreqs
apad                    fps                     showinfo
aperms                  framepack               showpalette
aphasemeter             framerate               showspatial
aphaser                 framestep               showspectrum
aphaseshift             freezedetect            showspectrumpic
apsnr                   freezeframes            showvolume
apsyclip                frei0r                  showwaves
apulsator               frei0r_src              showwavespic
arealtime               fspp                    shuffleframes
aresample               fsync                   shufflepixels
areverse                gblur                   shuffleplanes
arls                    gblur_vulkan            sidechaincompress
arnndn                  geq                     sidechaingate
asdr                    gradfun                 sidedata
asegment                gradients               sierpinski
aselect                 graphmonitor            signalstats
asendcmd                grayworld               signature
asetnsamples            greyedge                silencedetect
asetpts                 guided                  silenceremove
asetrate                haas                    sinc
asettb                  haldclut                sine
ashowinfo               haldclutsrc             siti
asidedata               hdcd                    smartblur
asisdr                  headphone               smptebars
asoftclip               hflip                   smptehdbars
aspectralstats          hflip_vulkan            sobel
asplit                  highpass                sobel_opencl
ass                     highshelf               sofalizer
astats                  hilbert                 spectrumsynth
astreamselect           histeq                  speechnorm
asubboost               histogram               split
asubcut                 hqdn3d                  spp
asupercut               hqx                     sr
asuperpass              hstack                  ssim
asuperstop              hstack_qsv              ssim360
atadenoise              hsvhold                 stereo3d
atempo                  hsvkey                  stereotools
atilt                   hue                     stereowiden
atrim                   huesaturation           streamselect
avectorscope            hwdownload              subtitles
avgblur                 hwmap                   super2xsai
avgblur_opencl          hwupload                superequalizer
avgblur_vulkan          hwupload_cuda           surround
avsynctest              hysteresis              swaprect
axcorrelate             identity                swapuv
azmq                    idet                    tblend
backgroundkey           il                      telecine
bandpass                inflate                 testsrc
bandreject              interlace               testsrc2
bass                    interleave              thistogram
bbox                    join                    threshold
bench                   kerndeint               thumbnail
bilateral               kirsch                  thumbnail_cuda
bilateral_cuda          ladspa                  tile
biquad                  lagfun                  tiltandshift
bitplanenoise           latency                 tiltshelf
blackdetect             lenscorrection          tinterlace
blackframe              lensfun                 tlut2
blend                   libplacebo              tmedian
blend_vulkan            libvmaf                 tmidequalizer
blockdetect             life                    tmix
blurdetect              limitdiff               tonemap
bm3d                    limiter                 tonemap_opencl
boxblur                 loop                    tpad
boxblur_opencl          loudnorm                transpose
bs2b                    lowpass                 transpose_opencl
bwdif                   lowshelf                transpose_vulkan
bwdif_cuda              lumakey                 treble
bwdif_vulkan            lut                     tremolo
cas                     lut1d                   trim
ccrepack                lut2                    unpremultiply
cellauto                lut3d                   unsharp
channelmap              lutrgb                  unsharp_opencl
channelsplit            lutyuv                  untile
chorus                  mandelbrot              uspp
chromaber_vulkan        maskedclamp             v360
chromahold              maskedmax               vaguedenoiser
chromakey               maskedmerge             varblur
chromakey_cuda          maskedmin               vectorscope
chromanr                maskedthreshold         vflip
chromashift             maskfun                 vflip_vulkan
ciescope                mcdeint                 vfrdet
codecview               mcompand                vibrance
color                   median                  vibrato
color_vulkan            mergeplanes             vidstabdetect
colorbalance            mestimate               vidstabtransform
colorchannelmixer       metadata                vif
colorchart              midequalizer            vignette
colorcontrast           minterpolate            virtualbass
colorcorrect            mix                     vmafmotion
colorhold               monochrome              volume
colorize                morpho                  volumedetect
colorkey                movie                   vpp_qsv
colorkey_opencl         mpdecimate              vstack
colorlevels             mptestsrc               vstack_qsv
colormap                msad                    w3fdif
colormatrix             multiply                waveform
colorspace              negate                  weave
colorspace_cuda         nlmeans                 xbr
colorspectrum           nlmeans_opencl          xcorrelate
colortemperature        nlmeans_vulkan          xfade
compand                 nnedi                   xfade_opencl
compensationdelay       noformat                xfade_vulkan
concat                  noise                   xmedian
convolution             normalize               xstack
convolution_opencl      null                    xstack_qsv
convolve                nullsink                yadif
copy                    nullsrc                 yadif_cuda
corr                    openclsrc               yaepblur
cover_rect              oscilloscope            yuvtestsrc
crop                    overlay                 zmq
cropdetect              overlay_cuda            zoneplate
crossfeed               overlay_opencl          zoompan
crystalizer             overlay_qsv             zscale
cue                     overlay_vulkan
curves                  owdenoise

Enabled bsfs:
aac_adtstoasc           h264_redundant_pps      pcm_rechunk
av1_frame_merge         hapqa_extract           pgs_frame_merge
av1_frame_split         hevc_metadata           prores_metadata
av1_metadata            hevc_mp4toannexb        remove_extradata
chomp                   imx_dump_header         setts
dca_core                media100_to_mjpegb      text2movsub
dts2pts                 mjpeg2jpeg              trace_headers
dump_extradata          mjpega_dump_header      truehd_core
dv_error_marker         mov2textsub             vp9_metadata
eac3_core               mp3_header_decompress   vp9_raw_reorder
evc_frame_merge         mpeg2_metadata          vp9_superframe
extract_extradata       mpeg4_unpack_bframes    vp9_superframe_split
filter_units            noise                   vvc_metadata
h264_metadata           null                    vvc_mp4toannexb
h264_mp4toannexb        opus_metadata

Enabled indevs:
dshow                   lavfi                   vfwcap
gdigrab                 libcdio

Enabled outdevs:
caca                    sdl2

git-full external libraries' versions: 

AMF v1.4.32-2-g8787d3e
aom v3.8.1-248-g8a3dfd5395
aribb24 v1.0.3-5-g5e9be27
aribcaption 1.1.1
AviSynthPlus v3.7.3-61-g98373ac8
bs2b 3.1.0
chromaprint 1.5.1
codec2 1.2.0-76-g5e79a723
dav1d 1.3.0-55-g16ed8e8
davs2 1.7-1-gb41cf11
ffnvcodec n12.1.14.0-1-g75f032b
flite v2.2-55-g6c9f20d
freetype VER-2-13-2
frei0r v2.3.2
fribidi v1.0.13-2-g5b9a242
gsm 1.0.22
harfbuzz 8.3.0-68-g846d5204c
ladspa-sdk 1.17
lame 3.100
libass 0.17.0-71-g58a8f09
libcdio-paranoia 10.2
libgme 0.6.3
libilbc v3.0.4-346-g6adb26d4a4
libjxl v0.9-snapshot-845-g1f9b04f7
libopencore-amrnb 0.1.6
libopencore-amrwb 0.1.6
libplacebo v6.338.0-64-g34e019bf
libsoxr 0.1.3
libssh 0.10.4
libtheora 1.1.1
libwebp v1.3.2-110-g5efd6300
oneVPL 2.9
OpenCL-Headers v2023.12.14
openmpt libopenmpt-0.6.12-72-gc35f5bb36
opus v1.4-9-gc8549975
rav1e p20240123-2-g3c3a26f7
rist 0.2.8
rubberband v1.8.1
SDL prerelease-2.29.2-27-gc55bd2482
shaderc v2023.8-3-g9bd299b
shine 3.1.1
snappy 1.1.10
speex Speex-1.2.1-20-g3693431
srt v1.5.3-33-g3dba3f4
SVT-AV1 v1.8.0-8-gfd71fc49
twolame 0.4.0
uavs3d v1.1-47-g1fd0491
vidstab v1.1.1-11-gc8caf90
vmaf v3.0.0-39-gc40e5f56
vo-amrwbenc 0.1.3
vorbis v1.3.7-10-g84c02369
vpx v1.14.0-84-g433577ae3
vulkan-loader v1.3.276
x264 v0.164.3173
x265 3.5-155-g74abf80c7
xavs2 1.4
xvid v1.3.7
zeromq 4.3.5
zimg release-3.0.5-150-g7143181
zvbi v0.2.42-41-gb4cef50

