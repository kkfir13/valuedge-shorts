import sys, glob, os
from PIL import Image, ImageDraw
d, out = sys.argv[1], sys.argv[2]
fs = sorted(glob.glob(d + "/f*.jpg")); cols = 6; w, h = 270, 480
rows = (len(fs) + cols - 1) // cols
S = Image.new("RGB", (cols * w, rows * (h + 22)), "white"); D = ImageDraw.Draw(S)
for i, f in enumerate(fs):
    im = Image.open(f).resize((w, h)); x, y = (i % cols) * w, (i // cols) * (h + 22)
    S.paste(im, (x, y + 22)); D.text((x + 4, y + 4), os.path.basename(f)[1:5], fill="black")
S.save(out, quality=88)
