//©HYPEUPGRADETR (based multible sources, modified and optimised by HYPEUPGRADETR)
//@version=5

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║ SR Channel                                                                   ║
// ║ Any 8 Moving Averages                                                        ║
// ║                                                                              ║
// ║ developer : HYPEUPGRADETR                                                    ║
// ║ creators  : HYPEUPGRADETR, LonesomeThecolor.blue, FriendOfTheTrend           ║
// ║                                                                              ║
// ║ This source code is subject to the terms of the Mozilla Public License 2.0   ║
// ║ at https://mozilla.org/MPL/2.0/                                              ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ╔══════════════════════════════════════╗
// ║                                      ║
// ║     colors                           ║
// ║                                      ║
// ╚══════════════════════════════════════╝


// v3 Style Gradient
GRN01 = #7CFC00, GRN02 = #32CD32, GRN03 = #228B22, GRN04 = #006400, GRN05 = #008000, GRN06=#093507
RED01 = #FF4500, RED02 = #FF0000, RED03 = #B22222, RED04 = #8B0000, RED05 = #800000, RED06=#330d06

// ──────────[ v3 Style Colors ]
AQUA    = #00FFFF
BLACK   = #000000
BLUE    = #0000FF
FUCHSIA = #FF00FF
GRAY    = #808080
GREEN   = #008000
LIME    = #00FF00
MAROON  = #800000
NAVY    = #000080
OLIVE   = #808000
ORANGE  = #FF7F00
PURPLE  = #800080
RUBI    = #FF0000
SILVER  = #C0C0C0
TEAL    = #008080
YELLOW  = #FFFF00
WHITE   = #FFFFFF

// ╔══════════════════════════════════════╗
// ║                                      ║
// ║     indicator functions              ║
// ║                                      ║
// ╚══════════════════════════════════════╝


indicator(title='HYPEUPGRADETR 4', overlay=true, max_bars_back=1000, max_lines_count=500, max_labels_count=400, max_boxes_count=200)


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (support resistance)                                          ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

prd = input.int(defval=10, title='Pivot Period', minval=4, maxval=30, group='=== S/R CHANNEL SETTINGS ===', tooltip='Used while calculating Pivot Points, checks left&right bars')
ppsrc = input.string(defval='High/Low', title='Source', options=['High/Low', 'Close/Open'], group='=== S/R CHANNEL SETTINGS ===', tooltip='Source for Pivot Points')
ChannelW = input.int(defval=5, title='Maximum Channel Width %', minval=1, maxval=8, group='=== S/R CHANNEL SETTINGS ===', tooltip='Calculated using Highest/Lowest levels in 300 bars')
minstrength = input.int(defval=1, title='Minimum Strength', minval=1, group='=== S/R CHANNEL SETTINGS ===', tooltip='Channel must contain at least 2 Pivot Points')
maxnumsr = input.int(defval=6, title='Maximum Number of S/R', minval=1, maxval=10, group='=== S/R CHANNEL SETTINGS ===', tooltip='Maximum number of Support/Resistance Channels to Show') - 1
loopback = input.int(defval=400, title='Loopback Period', minval=100, maxval=400, group='=== S/R CHANNEL SETTINGS ===', tooltip='While calculating S/R levels it checks Pivots in Loopback Period')
res_col = input.color(defval=color.new(color=#f7525f, transp=65), title='Resistance Color', group='=== S/R COLOR SETTINGS ===')
sup_col = input.color(defval=color.new(color=#00e676, transp=65), title='Support Color', group='=== S/R COLOR SETTINGS ===')
inch_col = input.color(defval=color.new(color=#ffeb3b, transp=50), title='Color When Price in Channel', group='=== S/R COLOR SETTINGS ===')
showpp = input.bool(defval=false, title='Show Pivot Points', group='=== S/R EXTRA SETTINGS ===')
showsrbroken = input.bool(defval=false, title='Show Broken Support/Resistance', group='=== S/R EXTRA SETTINGS ===')


// get Pivot High/low
float src1 = ppsrc == 'High/Low' ? high : math.max(close, open)
float src2 = ppsrc == 'High/Low' ? low : math.min(close, open)
float ph = ta.pivothigh(src1, prd, prd)
float pl = ta.pivotlow(src2, prd, prd)

// draw Pivot points
plotshape(ph and showpp, text='H', style=shape.labeldown, color=na, textcolor=color.new(color.red, 0), location=location.abovebar, offset=-prd)
plotshape(pl and showpp, text='L', style=shape.labelup, color=na, textcolor=color.new(color.lime, 0), location=location.belowbar, offset=-prd)

//calculate maximum S/R channel width
prdhighest = ta.highest(300)
prdlowest = ta.lowest(300)
cwidth = (prdhighest - prdlowest) * ChannelW / 100

// get/keep Pivot levels
var pivotvals = array.new_float(0)
var pivotlocs = array.new_float(0)
if ph or pl
    array.unshift(pivotvals, ph ? ph : pl)
    array.unshift(pivotlocs, bar_index)
    for x = array.size(pivotvals) - 1 to 0 by 1
        if bar_index - array.get(pivotlocs, x) > loopback  // remove old pivot points
            array.pop(pivotvals)
            array.pop(pivotlocs)
            continue
        break

//find/create SR channel of a pivot point
get_sr_vals(ind) =>
    float lo = array.get(pivotvals, ind)
    float hi = lo
    int numpp = 0
    for y = 0 to array.size(pivotvals) - 1 by 1
        float cpp = array.get(pivotvals, y)
        float wdth = cpp <= hi ? hi - cpp : cpp - lo
        if wdth <= cwidth  // fits the max channel width?
            if cpp <= hi
                lo := math.min(lo, cpp)
                lo
            else
                hi := math.max(hi, cpp)
                hi

            numpp += 20  // each pivot point added as 20
            numpp
    [hi, lo, numpp]

// keep old SR channels and calculate/sort new channels if we met new pivot point
var suportresistance = array.new_float(20, 0)  // min/max levels
changeit(x, y) =>
    tmp = array.get(suportresistance, y * 2)
    array.set(suportresistance, y * 2, array.get(suportresistance, x * 2))
    array.set(suportresistance, x * 2, tmp)
    tmp := array.get(suportresistance, y * 2 + 1)
    array.set(suportresistance, y * 2 + 1, array.get(suportresistance, x * 2 + 1))
    array.set(suportresistance, x * 2 + 1, tmp)

if ph or pl
    supres = array.new_float(0)  // number of pivot, strength, min/max levels
    stren = array.new_float(10, 0)
    // get levels and strengs
    for x = 0 to array.size(pivotvals) - 1 by 1
        [hi, lo, strength] = get_sr_vals(x)
        array.push(supres, strength)
        array.push(supres, hi)
        array.push(supres, lo)

    // add each HL to strengh
    for x = 0 to array.size(pivotvals) - 1 by 1
        h = array.get(supres, x * 3 + 1)
        l = array.get(supres, x * 3 + 2)
        s = 0
        for y = 0 to loopback by 1
            if high[y] <= h and high[y] >= l or low[y] <= h and low[y] >= l
                s += 1
                s
        array.set(supres, x * 3, array.get(supres, x * 3) + s)

    //reset SR levels
    array.fill(suportresistance, 0)
    // get strongest SRs
    src = 0
    for x = 0 to array.size(pivotvals) - 1 by 1
        stv = -1.  // value
        stl = -1  // location
        for y = 0 to array.size(pivotvals) - 1 by 1
            if array.get(supres, y * 3) > stv and array.get(supres, y * 3) >= minstrength * 20
                stv := array.get(supres, y * 3)
                stl := y
                stl
        if stl >= 0
            //get sr level
            hh = array.get(supres, stl * 3 + 1)
            ll = array.get(supres, stl * 3 + 2)
            array.set(suportresistance, src * 2, hh)
            array.set(suportresistance, src * 2 + 1, ll)
            array.set(stren, src, array.get(supres, stl * 3))

            // make included pivot points' strength zero
            for y = 0 to array.size(pivotvals) - 1 by 1
                if array.get(supres, y * 3 + 1) <= hh and array.get(supres, y * 3 + 1) >= ll or array.get(supres, y * 3 + 2) <= hh and array.get(supres, y * 3 + 2) >= ll
                    array.set(supres, y * 3, -1)

            src += 1
            if src >= 10
                break

    for x = 0 to 8 by 1
        for y = x + 1 to 9 by 1
            if array.get(stren, y) > array.get(stren, x)
                tmp = array.get(stren, y)
                array.set(stren, y, array.get(stren, x))
                changeit(x, y)


get_level(ind) =>
    float ret = na
    if ind < array.size(suportresistance)
        if array.get(suportresistance, ind) != 0
            ret := array.get(suportresistance, ind)
            ret
    ret

get_color(ind) =>
    color ret = na
    if ind < array.size(suportresistance)
        if array.get(suportresistance, ind) != 0
            ret := array.get(suportresistance, ind) > close and array.get(suportresistance, ind + 1) > close ? res_col : array.get(suportresistance, ind) < close and array.get(suportresistance, ind + 1) < close ? sup_col : inch_col
            ret
    ret

var srchannels = array.new_box(10)
for x = 0 to math.min(9, maxnumsr) by 1
    box.delete(array.get(srchannels, x))
    srcol = get_color(x * 2)
    if not na(srcol)
        array.set(srchannels, x, box.new(left=bar_index, top=get_level(x * 2), right=bar_index + 1, bottom=get_level(x * 2 + 1), border_color=srcol, border_width=0, extend=extend.left, bgcolor=srcol))

resistancebroken = false
supportbroken = false

// check if it's not in a channel
not_in_a_channel = true
for x = 0 to math.min(9, maxnumsr) by 1
    if close <= array.get(suportresistance, x * 2) and close >= array.get(suportresistance, x * 2 + 1)
        not_in_a_channel := false
        not_in_a_channel

// if price is not in a channel then check broken ones
if not_in_a_channel
    for x = 0 to math.min(9, maxnumsr) by 1
        if close[1] <= array.get(suportresistance, x * 2) and close > array.get(suportresistance, x * 2)
            resistancebroken := true
            resistancebroken
        if close[1] >= array.get(suportresistance, x * 2 + 1) and close < array.get(suportresistance, x * 2 + 1)
            supportbroken := true
            supportbroken

alertcondition(resistancebroken, title='Resistance Broken', message='Resistance Broken')
alertcondition(supportbroken, title='Support Broken', message='Support Broken')
plotshape(showsrbroken and resistancebroken, style=shape.triangleup, location=location.belowbar, color=color.new(color.lime, 0), size=size.tiny)
plotshape(showsrbroken and supportbroken, style=shape.triangledown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (support resistance)                                         ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (moving averages)                                             ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

//Percentage Table On/Off
tableOn = input.bool(false, title="Turn Percentage Table On/Off", group="=== MOVING AVARAGE Info Tables===")

//Table Positions
bright = position.bottom_right
bleft = position.bottom_left
bcenter = position.bottom_center
tright = position.top_right
tleft = position.top_left
tcenter = position.top_center
mright = position.middle_right
mleft = position.middle_left
mcenter = position.middle_center
tablePosition = input.string(tright, title="Indicator Table Position", options=[bright, bleft, bcenter, tright, tleft, tcenter, mright, mleft, mcenter], group="=== MOVING AVARAGE Info Tables ===")

//Moving Average Type Input
ema = "EMA"
sma = "SMA"
hma = "HMA"
vwma = "VWMA"
wma = "WMA"
rma = "RMA"

//Fill Color Variables
greenFill = #4caf5010
redFill = #ff525210

//Length, Source & Color Inputs
source = input.source(close, title="Moving Average Source", group="Moving Average Source")
ma1On = input.bool(false, title="Turn MA #1 On/Off", group="Moving Average #1")
maChoice1 = input.string("EMA", title="Type of MA #1", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #1")
length1 = input.int(20, title="Moving Average #1 Length", group="Moving Average #1")
ma1Linewidth = input.int(1, title="MA #1 Linewidth", group="Moving Average #1")
ma1Color1 = input.color(color.green, title="Line #1 Color Price Above", group="Moving Average #1")
ma1Color2 = input.color(color.red, title="Line #1 Color Price Below", group="Moving Average #1")
ma1Fill1 = input.color(greenFill, title="Line #1 Color Fill Price Above", group="Moving Average #1")
ma1Fill2 = input.color(redFill, title="Line #1 Color Fill Price Below", group="Moving Average #1")

ma2On = input.bool(false, title="Turn MA #2 On/Off", group="Moving Average #2")
maChoice2 = input.string("EMA", title="Type of MA #2", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #2")
length2 = input.int(50, title="Moving Average #2 Length", group="Moving Average #2")
ma2Linewidth = input.int(1, title="MA #2 Linewidth", group="Moving Average #2")
ma2Color1 = input.color(defval=color.new(color=#00e2ff, transp=0), title="Line #2 Color Price Above", group="Moving Average #2")
ma2Color2 = input.color(defval=color.new(color=#00e2ff, transp=0), title="Line #2 Color Price Below", group="Moving Average #2")
ma2Fill1 = input.color(greenFill, title="Line #2 Color Fill Price Above", group="Moving Average #2")
ma2Fill2 = input.color(redFill, title="Line #2 Color Fill Price Below", group="Moving Average #2")

ma3On = input.bool(false, title="Turn MA #3 On/Off", group="Moving Average #3")
maChoice3 = input.string("EMA", title="Type Of MA #3", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #3")
length3 = input.int(100, title="Moving Average #3 Length", group="Moving Average #3")
ma3Linewidth = input.int(1, title="MA #3 Linewidth", group="Moving Average #3")
ma3Color1 = input.color(color.green, title="Line #3 Color Price Above", group="Moving Average #3")
ma3Color2 = input.color(color.red, title="Line #3 Color Price Below", group="Moving Average #3")
ma3Fill1 = input.color(greenFill, title="Line #3 Color Fill Price Above", group="Moving Average #3")
ma3Fill2 = input.color(redFill, title="Line #3 Color Fill Price Below", group="Moving Average #3")

ma4On = input.bool(false, title="Turn MA #4 On/Off", group="Moving Average #4")
maChoice4 = input.string("EMA", title="Type Of MA #4", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #4")
length4 = input.int(200, title="Moving Average #4 Length", group="Moving Average #4")
ma4Linewidth = input.int(1, title="MA #4 Linewidth", group="Moving Average #4")
ma4Color1 = input.color(defval=color.new(color=#00e2ff, transp=0), title="Line #4 Color Price Above", group="Moving Average #4")
ma4Color2 = input.color(defval=color.new(color=#00e2ff, transp=0), group="Moving Average #4")
ma4Fill1 = input.color(greenFill, title="Line #4 Color Fill Price Above", group="Moving Average #4")
ma4Fill2 = input.color(redFill, title="Line #4 Color Fill Price Below", group="Moving Average #4")

ma5On = input.bool(true, title="Turn MA #5 On/Off", group="Moving Average #5")
maChoice5 = input.string("EMA", title="Type Of MA #5", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #5")
length5 = input.int(610, title="Moving Average #5 Length", group="Moving Average #5")
ma5Linewidth = input.int(1, title="MA #5 Linewidth", group="Moving Average #5")
ma5Color1 = input.color(defval=color.new(color=#00ff39, transp=0), title="Line #5 Color Price Above", group="Moving Average #5")
ma5Color2 = input.color(defval=color.new(color=#ff0014, transp=0), title="Line #5 Color Price Below", group="Moving Average #5")
ma5Fill1 = input.color(greenFill, title="Line #5 Color Fill Price Above", group="Moving Average #5")
ma5Fill2 = input.color(redFill, title="Line #5 Color Fill Price Below", group="Moving Average #5")

ma6On = input.bool(true, title="Turn MA #6 On/Off", group="Moving Average #6")
maChoice6 = input.string("EMA", title="Type Of MA #6", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #6")
length6 = input.int(987, title="Moving Average #6 Length", group="Moving Average #6")
ma6Linewidth = input.int(1, title="MA #6 Linewidth", group="Moving Average #6")
ma6Color1 = input.color(defval=color.new(color=#00ff39, transp=0), title="Line #6 Color Price Above", group="Moving Average #6")
ma6Color2 = input.color(defval=color.new(color=#ff0014, transp=0), title="Line #6 Color Price Below", group="Moving Average #6")
ma6Fill1 = input.color(greenFill, title="Line #6 Color Fill Price Above", group="Moving Average #6")
ma6Fill2 = input.color(redFill, title="Line #6 Color Fill Price Below", group="Moving Average #6")

ma7On = input.bool(true, title="Turn MA #7 On/Off", group="Moving Average #7")
maChoice7 = input.string("EMA", title="Type Of MA #7", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #7")
length7 = input.int(1597, title="Moving Average #7 Length", group="Moving Average #7")
ma7Linewidth = input.int(1, title="MA #7 Linewidth", group="Moving Average #7")
ma7Color1 = input.color(defval=color.new(color=#00ff39, transp=0), title="Line #7 Color Price Above", group="Moving Average #7")
ma7Color2 = input.color(defval=color.new(color=#ff0014, transp=0), title="Line #7 Color Price Below", group="Moving Average #7")
ma7Fill1 = input.color(greenFill, title="Line #7 Color Fill Price Above", group="Moving Average #7")
ma7Fill2 = input.color(redFill, title="Line #7 Color Fill Price Below", group="Moving Average #7")

ma8On = input.bool(true, title="Turn MA #8 On/Off", group="Moving Average #8")
maChoice8 = input.string("EMA", title="Type Of MA #8", options=[ema, sma, hma, vwma, wma, rma], group="Moving Average #8")
length8 = input.int(2584, title="Moving Average #8 Length", group="Moving Average #8")
ma8Linewidth = input.int(1, title="MA #8 Linewidth", group="Moving Average #8")
ma8Color1 = input.color(defval=color.new(color=#00ff39, transp=0), title="Line #8 Color Price Above", group="Moving Average #8")
ma8Color2 = input.color(defval=color.new(color=#ff0014, transp=0), title="Line #8 Color Price Below", group="Moving Average #8")
ma8Fill1 = input.color(greenFill, title="Line #8 Color Fill Price Above", group="Moving Average #8")
ma8Fill2 = input.color(redFill, title="Line #8 Color Fill Price Below", group="Moving Average #8")

//Moving Average Type Logic
ma1 = 0.0
ma2 = 0.0
ma3 = 0.0
ma4 = 0.0
ma5 = 0.0
ma6 = 0.0
ma7 = 0.0
ma8 = 0.0

if maChoice1 == ema
    if ma1On
        ma1 := ta.ema(source, length1)
    else
        ma1 := na
if maChoice2 == ema
    if ma2On
        ma2 := ta.ema(source, length2)
    else
        ma2 := na
if maChoice3 == ema
    if ma3On
        ma3 := ta.ema(source, length3)
    else
        ma3 := na
if maChoice4 == ema
    if ma4On
        ma4 := ta.ema(source, length4)
    else
        ma4 := na
if maChoice5 == ema
    if ma5On
        ma5 := ta.ema(source, length5)
    else
        ma5 := na
if maChoice6 == ema
    if ma6On
        ma6 := ta.ema(source, length6)
    else
        ma6 := na
if maChoice7 == ema
    if ma7On
        ma7 := ta.ema(source, length7)
    else
        ma7 := na
if maChoice8 == ema
    if ma8On
        ma8 := ta.ema(source, length8)
    else
        ma8 := na

if maChoice1 == sma
    if ma1On
        ma1 := ta.sma(source, length1)
    else
        ma1 := na
if maChoice2 == sma
    if ma2On
        ma2 := ta.sma(source, length2)
    else
        ma2 := na
if maChoice3 == sma
    if ma3On
        ma3 := ta.sma(source, length3)
    else
        ma3 := na
if maChoice4 == sma
    if ma4On
        ma4 := ta.sma(source, length4)
    else
        ma4 := na
if maChoice5 == sma
    if ma5On
        ma5 := ta.sma(source, length5)
    else
        ma5 := na
if maChoice6 == sma
    if ma6On
        ma6 := ta.sma(source, length6)
    else
        ma6 := na
if maChoice7 == sma
    if ma7On
        ma7 := ta.sma(source, length7)
    else
        ma7 := na
if maChoice8 == sma
    if ma8On
        ma8 := ta.sma(source, length8)
    else
        ma8 := na

if maChoice1 == hma
    if ma1On
        ma1 := ta.hma(source, length1)
    else
        ma1 := na
if maChoice2 == hma
    if ma2On
        ma2 := ta.hma(source, length2)
    else
        ma2 := na
if maChoice3 == hma
    if ma3On
        ma3 := ta.hma(source, length3)
    else
        ma3 := na
if maChoice4 == hma
    if ma4On
        ma4 := ta.hma(source, length4)
    else
        ma4 := na
if maChoice5 == hma
    if ma5On
        ma5 := ta.hma(source, length5)
    else
        ma5 := na
if maChoice6 == hma
    if ma6On
        ma6 := ta.hma(source, length6)
    else
        ma6 := na
if maChoice7 == hma
    if ma7On
        ma7 := ta.hma(source, length7)
    else
        ma7 := na
if maChoice8 == hma
    if ma8On
        ma8 := ta.hma(source, length8)
    else
        ma8 := na

if maChoice1 == wma
    if ma1On
        ma1 := ta.wma(source, length1)
    else
        ma1 := na
if maChoice2 == wma
    if ma2On
        ma2 := ta.wma(source, length2)
    else
        ma2 := na
if maChoice3 == wma
    if ma3On
        ma3 := ta.wma(source, length3)
    else
        ma3 := na
if maChoice4 == wma
    if ma4On
        ma4 := ta.wma(source, length4)
    else
        ma4 := na
if maChoice5 == wma
    if ma5On
        ma5 := ta.wma(source, length5)
    else
        ma5 := na
if maChoice6 == wma
    if ma6On
        ma6 := ta.wma(source, length6)
    else
        ma6 := na
if maChoice7 == wma
    if ma7On
        ma7 := ta.wma(source, length7)
    else
        ma7 := na
if maChoice8 == wma
    if ma8On
        ma8 := ta.wma(source, length8)
    else
        ma8 := na

if maChoice1 == vwma
    if ma1On
        ma1 := ta.vwma(source, length1)
    else
        ma1 := na
if maChoice2 == vwma
    if ma2On
        ma2 := ta.vwma(source, length2)
    else
        ma2 := na
if maChoice3 == vwma
    if ma3On
        ma3 := ta.vwma(source, length3)
    else
        ma3 := na
if maChoice4 == vwma
    if ma4On
        ma4 := ta.vwma(source, length4)
    else
        ma4 := na
if maChoice5 == vwma
    if ma5On
        ma5 := ta.vwma(source, length5)
    else
        ma5 := na
if maChoice6 == vwma
    if ma6On
        ma6 := ta.vwma(source, length6)
    else
        ma6 := na
if maChoice7 == vwma
    if ma7On
        ma7 := ta.vwma(source, length7)
    else
        ma7 := na
if maChoice8 == vwma
    if ma8On
        ma8 := ta.vwma(source, length8)
    else
        ma8 := na

if maChoice1 == rma
    if ma1On
        ma1 := ta.rma(source, length1)
    else
        ma1 := na
if maChoice2 == rma
    if ma2On
        ma2 := ta.rma(source, length2)
    else
        ma2 := na
if maChoice3 == rma
    if ma3On
        ma3 := ta.rma(source, length3)
    else
        ma3 := na
if maChoice4 == rma
    if ma4On
        ma4 := ta.rma(source, length4)
    else
        ma4 := na
if maChoice5 == rma
    if ma5On
        ma5 := ta.rma(source, length5)
    else
        ma5 := na
if maChoice6 == rma
    if ma6On
        ma6 := ta.rma(source, length6)
    else
        ma6 := na
if maChoice7 == rma
    if ma7On
        ma7 := ta.rma(source, length7)
    else
        ma7 := na
if maChoice8 == rma
    if ma8On
        ma8 := ta.rma(source, length8)
    else
        ma8 := na

//Candle Moving Average For Fills
candleLine = ta.sma(close, 1)
candles = plot(candleLine, title="Candle Line 1:1", color=#00000000)

//Color Matching Percentage Table
color1 = close > ma1 ? ma1Color1 : ma1Color2
color2 = close > ma2 ? ma2Color1 : ma2Color2
color3 = close > ma3 ? ma3Color1 : ma3Color2
color4 = close > ma4 ? ma4Color1 : ma4Color2
color5 = close > ma5 ? ma5Color1 : ma5Color2
color6 = close > ma6 ? ma6Color1 : ma6Color2
color7 = close > ma7 ? ma7Color1 : ma7Color2
color8 = close > ma8 ? ma8Color1 : ma8Color2

//Line Plots
plotLine1 = plot(ma1, title="MA #1", color=close > ma1 ? ma1Color1 : ma1Color2, linewidth=ma1Linewidth, style=plot.style_line)
plotLine2 = plot(ma2, title="MA #2", color=close > ma2 ? ma2Color1 : ma2Color2, linewidth=ma2Linewidth, style=plot.style_line)
plotLine3 = plot(ma3, title="MA #3", color=close > ma3 ? ma3Color1 : ma3Color2, linewidth=ma3Linewidth, style=plot.style_line)
plotLine4 = plot(ma4, title="MA #4", color=close > ma4 ? ma4Color1 : ma4Color2, linewidth=ma4Linewidth, style=plot.style_line)
plotLine5 = plot(ma5, title="MA #5", color=close > ma5 ? ma5Color1 : ma5Color2, linewidth=ma5Linewidth, style=plot.style_line)
plotLine6 = plot(ma6, title="MA #6", color=close > ma6 ? ma6Color1 : ma6Color2, linewidth=ma6Linewidth, style=plot.style_line)
plotLine7 = plot(ma7, title="MA #7", color=close > ma7 ? ma7Color1 : ma7Color2, linewidth=ma7Linewidth, style=plot.style_line)
plotLine8 = plot(ma8, title="MA #8", color=close > ma8 ? ma8Color1 : ma8Color2, linewidth=ma8Linewidth, style=plot.style_line)

//Color Fills
fill(candles, plotLine1, color=close > ma1 ? ma1Fill1 : ma1Fill2, title="MA #1")
fill(candles, plotLine2, title="MA #2", color=close > ma2 ? ma2Fill1 : ma2Fill2)
fill(candles, plotLine3, title="MA #3", color=close > ma3 ? ma3Fill1 : ma3Fill2)
fill(candles, plotLine4, title="MA #4", color=close > ma4 ? ma4Fill1 : ma4Fill2)
fill(candles, plotLine5, title="MA #5", color=close > ma5 ? ma5Fill1 : ma5Fill2)
fill(candles, plotLine6, title="MA #6", color=close > ma6 ? ma6Fill1 : ma6Fill2)
fill(candles, plotLine7, title="MA #7", color=close > ma7 ? ma7Fill1 : ma7Fill2)
fill(candles, plotLine8, title="MA #8", color=close > ma8 ? ma8Fill1 : ma8Fill2)

//Price Difference Calculations
priceDiffMa1 = 0.0
if close > ma1
    priceDiffMa1 := (close - ma1) / close * 100
if close < ma1
    priceDiffMa1 := (ma1 - close) / ma1 * 100

priceDiffMa2 = 0.0
if close > ma2
    priceDiffMa2 := (close - ma2) / close * 100
if close < ma2
    priceDiffMa2 := (ma2 - close) / ma2 * 100

priceDiffMa3 = 0.0
if close > ma3
    priceDiffMa3 := (close - ma3) / close * 100
if close < ma3
    priceDiffMa3 := (ma3 - close) / ma3 * 100

priceDiffMa4 = 0.0
if close > ma4
    priceDiffMa4 := (close - ma4) / close * 100
if close < ma4
    priceDiffMa4 := (ma4 - close) / ma4 * 100

priceDiffMa5 = 0.0
if close > ma5
    priceDiffMa5 := (close - ma5) / close * 100
if close < ma5
    priceDiffMa5 := (ma5 - close) / ma5 * 100

priceDiffMa6 = 0.0
if close > ma6
    priceDiffMa6 := (close - ma6) / close * 100
if close < ma6
    priceDiffMa6 := (ma6 - close) / ma6 * 100

priceDiffMa7 = 0.0
if close > ma7
    priceDiffMa7 := (close - ma7) / close * 100
if close < ma7
    priceDiffMa7 := (ma7 - close) / ma7 * 100

priceDiffMa8 = 0.0
if close > ma8
    priceDiffMa8 := (close - ma8) / close * 100
if close < ma8
    priceDiffMa8 := (ma8 - close) / ma8 * 100

//Percentage Text
percentFromMa1 = str.tostring(priceDiffMa1, format.percent) + " From " + str.tostring(maChoice1) + " " + str.tostring(length1)
percentFromMa2 = str.tostring(priceDiffMa2, format.percent) + " From " + str.tostring(maChoice2) + " " + str.tostring(length2)
percentFromMa3 = str.tostring(priceDiffMa3, format.percent) + " From " + str.tostring(maChoice3) + " " + str.tostring(length3)
percentFromMa4 = str.tostring(priceDiffMa4, format.percent) + " From " + str.tostring(maChoice4) + " " + str.tostring(length4)
percentFromMa5 = str.tostring(priceDiffMa5, format.percent) + " From " + str.tostring(maChoice5) + " " + str.tostring(length5)
percentFromMa6 = str.tostring(priceDiffMa6, format.percent) + " From " + str.tostring(maChoice6) + " " + str.tostring(length6)
percentFromMa7 = str.tostring(priceDiffMa7, format.percent) + " From " + str.tostring(maChoice7) + " " + str.tostring(length7)
percentFromMa8 = str.tostring(priceDiffMa8, format.percent) + " From " + str.tostring(maChoice8) + " " + str.tostring(length8)

//Remove Percentage Text When MA Is Turned Off
if ma1On == false
    percentFromMa1 := na
if ma2On == false
    percentFromMa2 := na
if ma3On == false
    percentFromMa3 := na
if ma4On == false
    percentFromMa4 := na
if ma5On == false
    percentFromMa5 := na
if ma6On == false
    percentFromMa6 := na
if ma7On == false
    percentFromMa7 := na
if ma8On == false
    percentFromMa8 := na

//Percentage Update Table
percentTable = table.new(tablePosition, columns=1, rows=8)
if tableOn and barstate.islast
    table.cell(table_id=percentTable, column=0, row=0, text=percentFromMa1, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color1)
    table.cell(table_id=percentTable, column=0, row=1, text=percentFromMa2, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color2)
    table.cell(table_id=percentTable, column=0, row=2, text=percentFromMa3, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color3)
    table.cell(table_id=percentTable, column=0, row=3, text=percentFromMa4, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color4)
    table.cell(table_id=percentTable, column=0, row=4, text=percentFromMa5, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color5)
    table.cell(table_id=percentTable, column=0, row=5, text=percentFromMa6, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color6)
    table.cell(table_id=percentTable, column=0, row=6, text=percentFromMa7, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color7)
    table.cell(table_id=percentTable, column=0, row=7, text=percentFromMa8, height=0, text_color=color.white, text_halign=text.align_left, text_valign= text.align_center, bgcolor=color8)

//Alerts
alertcondition(ta.cross(close, ma1), title="Price Crossing MA #1", message="Price Crossing MA #1")
alertcondition(ta.cross(close, ma2), title="Price Crossing MA #2", message="Price Crossing MA #2")
alertcondition(ta.cross(close, ma3), title="Price Crossing MA #3", message="Price Crossing MA #3")
alertcondition(ta.cross(close, ma4), title="Price Crossing MA #4", message="Price Crossing MA #4")
alertcondition(ta.cross(close, ma5), title="Price Crossing MA #5", message="Price Crossing MA #5")
alertcondition(ta.cross(close, ma6), title="Price Crossing MA #6", message="Price Crossing MA #6")
alertcondition(ta.cross(close, ma7), title="Price Crossing MA #7", message="Price Crossing MA #7")
alertcondition(ta.cross(close, ma8), title="Price Crossing MA #8", message="Price Crossing MA #8")


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (moving averages)                                            ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (project name)                                                ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

table_top_left = 'top_left'
table_top_center = 'top_center'
table_top_right = 'top_right'
table_middle_left = 'middle_left'
table_middle_center = 'middle_center'
table_middle_right = 'middle_right'
table_bottom_left = 'bottom_left'
table_bottom_center = 'bottom_center'
table_bottom_right = 'bottom_right'


i_border_color = input.color(color.white, title='Border', group='settings', inline='border')
i_border_width = input.int(0, title='', minval=0, maxval=3, group='settings', inline='border')
i_table_position = input.string(table_top_right, title='Position', options=[table_top_left, table_top_center, table_top_right, table_middle_left, table_middle_center, table_middle_right, table_bottom_left, table_bottom_center, table_bottom_right], group='settings')


table tbl = table.new(i_table_position, columns=1, rows=15, frame_color=i_border_color, frame_width=-1, border_color=i_border_color, border_width=i_border_width)

i_show_1 = input.bool(true, title='', group='Line 1', inline='text1')
i_color_1 = input.color(color.rgb(0, 0, 0), title='', group='Line 1', inline='text1')
i_text_1 = input.string('HYPEUPGRADE TR', title='', group='Line 1', inline='text1')
i_height_1 = input.float(3.5, title='', group='Line 1', inline='text1_2')
i_size_1 = input.string('large', title='', options=['tiny', 'small', 'normal', 'large', 'auto'], group='Line 1', inline='text1_2')
i_align_1 = input.string('center', title='', options=['center', 'left', 'right'], group='Line 1', inline='text1_2')

if i_show_1
    table.cell(tbl, 0, 0, i_text_1, text_size=i_size_1, text_color=i_color_1, height=i_height_1, text_halign=i_align_1)


i_show_2 = input.bool(true, title='', group='Line 2', inline='text2')
i_color_2 = input.color(color.rgb(0, 0, 0), title='', group='Line 2', inline='text2')
i_text_2 = input.string('Fütüristik Kripto Merkezi', title='', group='Line 2', inline='text2')
i_height_2 = input.float(3.5, title='', group='Line 2', inline='text2_2')
i_size_2 = input.string('normal', title='', options=['tiny', 'small', 'normal', 'large', 'auto'], group='Line 2', inline='text2_2')
i_align_2 = input.string('center', title='', options=['center', 'left', 'right'], group='Line 2', inline='text2_2')

if i_show_2
    table.cell(tbl, 0, 1, i_text_2, text_size=i_size_2, text_color=i_color_2, height=i_height_2, text_halign=i_align_2)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (project name)                                               ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝