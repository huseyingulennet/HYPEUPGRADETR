//©HYPEUPGRADETR (based multible sources, modified and optimised by HYPEUPGRADETR)
//@version=5

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║ SR Channel                                                                   ║
// ║ OR/RB/FVG Finder                                                             ║
// ║ Divergences                                                                  ║
// ║                                                                              ║
// ║ developer : HYPEUPGRADETR                                                    ║
// ║ creators  : HYPEUPGRADETR, LonesomeTheblue, makuchaku                        ║
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


indicator(title='HYPEUPGRADETR 2', overlay=true, max_lines_count=500, max_labels_count=500, max_bars_back=2000)


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (or/rb/fvg finder)                                            ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

plotOB = input.bool(defval=true, title='Plot OB', group='=== ORDER BLOCK SETTINGS ===')
obBullColor = input.color(defval=color.new(color.green, 80), title='Bullish OB Color', inline='Set Custom Color', group='=== ORDER BLOCK SETTINGS ===')
obBearColor = input.color(defval=color.new(color.red, 80), title='Bearish OB Color', inline='Set Custom Color', group='=== ORDER BLOCK SETTINGS ===')
obBoxBorder = input.string(defval=line.style_dashed, title='OB Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='=== ORDER BLOCK SETTINGS ===', tooltip='To disable border, set Border Width below to 0')
obBorderTransparency = input.int(defval=50, title='OB Border Box Transparency', minval=0, maxval=100, group='=== ORDER BLOCK SETTINGS ===')
obMaxBoxSet = input.int(defval=10, title='Maximum OB Box Displayed', minval=1, maxval=100, group='=== ORDER BLOCK SETTINGS ===', tooltip='Minimum = 1, Maximum = 100')
filterMitOB = input.bool(defval=true, title='Custom Color Mitigated OB', group='=== ORDER BLOCK SETTINGS ===')
mitOBColor = input.color(defval=color.new(color.gray, 95), title='Mitigated OB Color', group='=== ORDER BLOCK SETTINGS ===', inline='Set Custom Color Mit OB', tooltip='Set Transparency to 0 to make mitigated OB disappear')

plotFVG = input.bool(defval=true, title='Plot FVG', group='Fair Value Gaps', inline='FVG sets')
plotStructureBreakingFVG = input.bool(defval=false, title='Plot Structure Breaking FVG', group='Fair Value Gaps', inline='FVG sets')
fvgBullColor = input.color(defval=color.new(color.yellow, 80), title='Bullish FVG Color', inline='Set Custom Color', group='Fair Value Gaps')
fvgBearColor = input.color(defval=color.new(color.yellow, 80), title='Bearish FVG Color', inline='Set Custom Color', group='Fair Value Gaps')
fvgStructBreakingColor = input.color(defval=color.new(color.blue, 90), title='Structure Breaking FVG Color', inline='Set Custom Color', group='Fair Value Gaps')
fvgBoxBorder = input.string(defval=line.style_dashed, title='FVG Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='Fair Value Gaps', tooltip='To disable border, set Border Width below to 0')
fvgBorderTransparency = input.int(defval=80, title='FVG Border Box Transparency', minval=0, maxval=100, group='Fair Value Gaps')
fvgMaxBoxSet = input.int(defval=10, title='Maximum FVG Box Displayed', minval=1, maxval=100, group='Fair Value Gaps', tooltip='Minimum = 1, Maximum = 100')
filterMitFVG = input.bool(defval=true, title='Custom Color Mitigated FVG', group='Fair Value Gaps')
mitFVGColor = input.color(defval=color.new(color.gray, 95), title='Mitigated FVG Color', group='Fair Value Gaps', inline='Set Custom Color Mit FVG', tooltip='Set Transparency to 0 to make mitigated FVG disappear')

plotRJB = input.bool(defval=true, title='Plot RJB', group='Rejection Blocks', inline='RJB sets')
rjbBullColor = input.color(defval=color.new(color.green, 90), title='Bullish RJB Color', inline='Set Custom Color', group='Rejection Blocks')
rjbBearColor = input.color(defval=color.new(color.red, 90), title='Bearish RJB Color', inline='Set Custom Color', group='Rejection Blocks')
rjbBoxBorder = input.string(defval=line.style_dashed, title='RJB Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='Rejection Blocks', tooltip='To disable border, set Border Width below to 0')
rjbBorderTransparency = input.int(defval=80, title='RJB Border Box Transparency', minval=0, maxval=100, group='Rejection Blocks')
rjbMaxBoxSet = input.int(defval=10, title='Maximum RJB Box Displayed', minval=1, maxval=100, group='Rejection Blocks', tooltip='Minimum = 1, Maximum = 100')
filterMitRJB = input.bool(defval=true, title='Custom Color Mitigated RJB', group='Rejection Blocks')
mitRJBColor = input.color(defval=color.new(color.gray, 95), title='Mitigated RJB Color', group='Rejection Blocks', inline='Set Custom Color Mit RJB', tooltip='Set to 100 to make mitigated RJB disappear')

plotPVT = input.bool(defval=false, title='Plot Pivots', group='Pivots')
pivotLookup  = input.int(defval=5, minval=1, maxval=5,title='Pivot Lookup', group='Pivots', tooltip='Minimum = 1, Maximum = 5')
pvtTopColor = input.color(defval=color.new(color.silver, 100), title='Pivot Top Color', group='Pivots', inline='PVT Color')
pvtBottomColor = input.color(defval=color.new(color.silver, 100), title='Pivot Bottom Color', group='Pivots', inline='PVT Color')

plotBOS = input.bool(defval=false, title='Plot BoS', group='Crossovers', inline='BOS sets')
useHighLowForBullishBoS = input.bool(defval=false, title='Use High/Low for Bullish BoS (for Bearish setup)', group='Crossovers')
useHighLowForBearishBoS = input.bool(defval=false, title='Use High/Low for Bearish BoS (for Bullish setup)', group='Crossovers')
bosBoxFlag  = input.bool(title='BoS Box Length Manually', defval=false, group='Crossovers', tooltip='If activated the BoS Boxes will not extend unitl crossed by price. Instead will extend by the amount of bars choosen in the "Set BoS Box Length Manually" option')
bosBoxLength  = input.int(title='BoS Box Length Manually', defval=3, minval=1, maxval=5, group='Crossovers', inline='BoS Boxes', tooltip='If "Set BoS Box Length Manually" is marked, choose by how many bars. Minimum = 1, Maximum = 5')
bosBullColor = input.color(defval=color.new(color.green, 90), title='Bullish BoS Color', inline='Set Custom Color', group='Crossovers')
bosBearColor = input.color(defval=color.new(color.red, 90), title='Bearish BoS Color', inline='Set Custom Color', group='Crossovers')
bosBoxBorder = input.string(defval=line.style_solid, title='BoS Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='Crossovers', tooltip='To disable border, set Border Width below to 0')
bosBorderTransparency = input.int(defval=80, title='BoS Border Box Transparency', minval=0, maxval=100, group='Crossovers')
bosMaxBoxSet = input.int(defval=10, title='Maximum BoS Box Displayed', minval=1, maxval=100, group='Crossovers', tooltip='Minimum = 1, Maximum = 100')

plotHVB = input.bool(defval=true, title='Plot HVB', group='High Volume Bar', tooltip='A candle where the average volume is higher than last few bars.')
hvbBullColor = input.color(defval=color.new(color=#00ff39, transp=0), title='Bullish HVB Color', inline='Set Custom Color', group='High Volume Bar')
hvbBearColor = input.color(defval=color.new(color=#da00ff, transp=0), title='Bearish HVB Color', inline='Set Custom Color', group='High Volume Bar')
hvbEMAPeriod = input.int(defval=12, minval=1, title='Volume EMA Period', group='High Volume Bar')
hvbMultiplier = input.float(defval=1.5, title='Volume Multiplier', minval=1, maxval=100, group='High Volume Bar')

plotPPDD = input.bool(defval=false, title="Plot PPDD OB's", group='Qualitative indicators', tooltip='Premium Premium Discount Discount (PPDD) is an OB formed after liquidity sweep. It will show up by default as a triangle (Bull ▲ / Bear ▼). Also PPDD1 (by deafult maked with a x-cross ⨯) which is a weak OB formed after liquidity sweep, that fails to completely engulf the high/low, but closes beyond the trapped candles open price.')
ppddBullColor = input.color(defval=color.new(color.green, 0), title="Bullish PPDD OB's Color", group='Qualitative indicators', inline='PPDD Color')
ppddBearColor = input.color(defval=color.new(color.red, 0), title="Bearish PPDD OB's Color", group='Qualitative indicators', inline='PPDD Color')

plotOBFVG = input.bool(defval=false, title='Plot Stacked OB+FVG', group='Qualitative indicators', tooltip='Marks the candle (default with a diamond ◆) when an OB & FVG are stacked, showing momentum')
obfvgBullColor = input.color(defval=color.new(color.green, 0), title='Bullish Stacked OB+FVG Color', group='Qualitative indicators', inline='OBFVG Color')
obfvgBearColor = input.color(defval=color.new(color.red, 0), title='Bearish Stacked OB+FVG Color', group='Qualitative indicators', inline='OBFVG Color')

plotLabelOB = input.bool(defval=true, title='Plot OB Label', inline='OB label', group='Label Options')
obLabelColor = input.color(defval=color.gray, title='Color', inline='OB label', group='Label Options')
obLabelSize = input.string(defval=size.tiny, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='OB label', group='Label Options')
plotLabelFVG = input.bool(defval=true, title='Plot FVG Label', inline='FVG label', group='Label Options')
fvgLabelColor = input.color(defval=color.gray, title='Color', inline='FVG label', group='Label Options')
fvgLabelSize = input.string(defval=size.tiny, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='FVG label', group='Label Options')
plotLabelRJB = input.bool(defval=true, title='Plot RJB Label', inline='RJB label', group='Label Options')
rjbLabelColor = input.color(defval=color.gray, title='Color', inline='RJB label', group='Label Options')
rjbLabelSize = input.string(defval=size.tiny, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='RJB label', group='Label Options')
plotLabelBOS = input.bool(defval=true, title='Plot BoS Label', inline='BOS label', group='Label Options')
bosLabelColor = input.color(defval=color.gray, title='Color', inline='BOS label', group='Label Options')
bosLabelSize = input.string(defval=size.tiny, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='BOS label', group='Label Options')

//Box Types
var int _ob  = 1
var int _fvg = 2
var int _rjb = 3
var int _bos = 4

//Box Labels
var string _obLabel  = "OB"
var string _fvgLabel = "FVG"
var string _rjbLabel = "RJB"
var string _bosLabel = "BoS"
var string _plus     = "+"
var string _minus    = "-"
var string _empty    = ""

//Box Arrays
var box[] _bearBoxesOB  = array.new_box()
var box[] _bullBoxesOB  = array.new_box()
var box[] _bearBoxesFVG = array.new_box()
var box[] _bullBoxesFVG = array.new_box()
var box[] _bearBoxesRJB = array.new_box()
var box[] _bullBoxesRJB = array.new_box()
var box[] _bearBoxesBOS = array.new_box()
var box[] _bullBoxesBOS = array.new_box()

//Functions
isUp(index) =>
    close[index] > open[index]

isDown(index) =>
    close[index] < open[index]

isObUp(index) =>
    isDown(index + 1) and isUp(index) and close[index] > high[index + 1]

isObDown(index) =>
    isUp(index + 1) and isDown(index) and close[index] < low[index + 1]

isFvgUp(index) =>
    (low[index] > high[index + 2])

isFvgDown(index) =>
    (high[index] < low[index + 2])

//Function to Calculte Box Length
_controlBox(_boxes, _high, _low, _type) =>
    if array.size(_boxes) > 0
        for i = array.size(_boxes) - 1 to 0 by 1
            _box = array.get(_boxes, i)
            _boxLow = box.get_bottom(_box)
            _boxHigh = box.get_top(_box)
            _boxRight = box.get_right(_box)
            if bosBoxFlag and _type == _bos
                if na or (bar_index + bosBoxLength - 1 == _boxRight and not((_high > _boxLow and _low < _boxLow) or (_high > _boxHigh and _low < _boxHigh)))
                    box.set_right(_box, bar_index + bosBoxLength - 1)
            else if (filterMitOB and _type == _ob) or (filterMitFVG and _type == _fvg) or (filterMitRJB and _type == _rjb)
                if na or (bar_index == _boxRight and not((_high > _boxLow and _low < _boxLow) or (_high > _boxHigh and _low < _boxHigh)))
                    box.set_right(_box, bar_index + 1)
                else
                    if _type == _ob
                        box.set_bgcolor(_box, mitOBColor)
                        box.set_border_color(_box, mitOBColor)
                    else if _type == _fvg
                        box.set_bgcolor(_box, mitFVGColor)
                        box.set_border_color(_box, mitFVGColor)
                    else if _type == _rjb
                        box.set_bgcolor(_box, mitRJBColor)
                        box.set_border_color(_box, mitRJBColor)
            else
                if na or (bar_index == _boxRight and not((_high > _boxLow and _low < _boxLow) or (_high > _boxHigh and _low < _boxHigh)))
                    box.set_right(_box, bar_index + 1)

//////////////////// Pivots ////////////////////
hih = ta.pivothigh(high, pivotLookup, pivotLookup)
lol = ta.pivotlow(low , pivotLookup, pivotLookup)
top = ta.valuewhen(hih, high[pivotLookup], 0)
bottom = ta.valuewhen(lol, low [pivotLookup], 0)
plot(top, offset=-pivotLookup, linewidth=1, color=(top != top[1] ? na : (plotPVT ? pvtTopColor : na)), title="Pivot Top")
plot(bottom, offset=-pivotLookup, linewidth=1, color=(bottom != bottom[1] ? na : (plotPVT ? pvtBottomColor : na)), title="Pivot Bottom")

//////////////////// Order Block //////////////////
//Bullish OB Box Plotting
if isObUp(1) and plotOB
    _bullboxOB = box.new(left=bar_index - 2, top=high[2], right=bar_index, bottom=math.min(low[2], low[1]), border_color=color.new(obBullColor, obBorderTransparency), border_style=obBoxBorder, border_width=1, bgcolor=obBullColor,
     text=plotLabelOB ? _obLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=obLabelSize, text_color=obLabelColor)
    if array.size(_bullBoxesOB) > obMaxBoxSet
        box.delete(array.shift(_bullBoxesOB))
    array.push(_bullBoxesOB, _bullboxOB)

//Bearish OB Box Plotting
if isObDown(1) and plotOB
    _bearboxOB = box.new(left=bar_index - 2, top=math.max(high[2], high[1]), right=bar_index, bottom=low[2], border_color=color.new(obBearColor, obBorderTransparency), border_style=obBoxBorder, border_width=1, bgcolor=obBearColor,
     text=plotLabelOB ? _obLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=obLabelSize, text_color=obLabelColor)
    if array.size(_bearBoxesOB) > obMaxBoxSet
        box.delete(array.shift(_bearBoxesOB))
    array.push(_bearBoxesOB, _bearboxOB)

if plotOB
    _controlBox(_bearBoxesOB, high, low, _ob)
    _controlBox(_bullBoxesOB, high, low, _ob)

//////////////////// Fair Value Gap //////////////////
//Bullish FVG Box Plotting
if isFvgUp(0)
    box _bullboxFVG = na
    if plotStructureBreakingFVG and (close[1] > top) and (low[1] < top) and (high[2] < top) and (low > top)
        _bullboxFVG := box.new(left=bar_index-2, top=low[0], right=bar_index, bottom=high[2], bgcolor=fvgStructBreakingColor, border_color=color.new(fvgStructBreakingColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)
    else if plotFVG
        _bullboxFVG := box.new(left=bar_index-2, top=low[0], right=bar_index, bottom=high[2], bgcolor=fvgBullColor, border_color=color.new(fvgBullColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)
    if array.size(_bullBoxesFVG) > fvgMaxBoxSet
        box.delete(array.shift(_bullBoxesFVG))
    array.push(_bullBoxesFVG, _bullboxFVG)

//Bearish FVG Box Plotting
if isFvgDown(0)
    box _bearboxFVG = na
    if plotStructureBreakingFVG and (close[1] < bottom) and (high[1] > bottom) and (low[2] > bottom) and (high < bottom)
        _bearboxFVG := box.new(left=bar_index-2, top=low[2], right=bar_index, bottom=high[0], bgcolor=fvgStructBreakingColor, border_color=color.new(fvgStructBreakingColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)
    else if plotFVG
        _bearboxFVG := box.new(left=bar_index-2, top=low[2], right=bar_index, bottom=high[0], bgcolor=fvgBearColor, border_color=color.new(fvgBearColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)
    if array.size(_bearBoxesFVG) > fvgMaxBoxSet
        box.delete(array.shift(_bearBoxesFVG))
    array.push(_bearBoxesFVG, _bearboxFVG)

if plotFVG or plotStructureBreakingFVG
    _controlBox(_bearBoxesFVG, high, low, _fvg)
    _controlBox(_bullBoxesFVG, high, low, _fvg)

//////////////////// Rejection Block //////////////////
if plotRJB
    isDownRjbObCondition = isObDown(1)
    isDownRjb1 = isDownRjbObCondition and  (high[1] < (close[2] + 0.2*(high[2]-close[2]))) // RJB is on trapped's wick and <50% of the wick was covered by signal
    isDownRjb2 = isDownRjbObCondition and (high[1] > high[2]) // RJB is on signal's wick
    if isDownRjb1 and plotRJB
        _bearboxRJB = box.new(left=bar_index-2, top=high[2], right=bar_index, bottom=close[2], bgcolor=rjbBearColor, border_color=color.new(rjbBearColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1,
         text=plotLabelRJB ? _rjbLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bearBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bearBoxesRJB))
        array.push(_bearBoxesRJB, _bearboxRJB)

    if isDownRjb2 and plotRJB
        _bearboxRJB = box.new(left=bar_index-1, top=high[1], right=bar_index, bottom=open[1], bgcolor=rjbBearColor, border_color=color.new(rjbBearColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1,
         text=plotLabelRJB ? _rjbLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bearBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bearBoxesRJB))
        array.push(_bearBoxesRJB, _bearboxRJB)

//Bullish RJB Box Plotting
if plotRJB
    isUpRjbObCondition = isObUp(1)
    isUpRjb1 = isUpRjbObCondition and (low[1] > (close[2] - 0.2*(close[2]-low[2]))) // RJB is on trapped's wick and <50% of the wick was covered by signal
    isUpRjb2 = isUpRjbObCondition and (low[1] < low[2]) // RJB is on signal's wick
    if isUpRjb1 and plotRJB
        _bullboxRJB = box.new(left=bar_index-2, top=close[2], right=bar_index, bottom=low[2], bgcolor=rjbBullColor, border_color=color.new(rjbBullColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1,
         text=plotLabelRJB ? _rjbLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bullBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bullBoxesRJB))
        array.push(_bullBoxesRJB, _bullboxRJB)

    if isUpRjb2 and plotRJB
        _bullboxRJB = box.new(left=bar_index-1, top=open[1], right=bar_index, bottom=low[1], bgcolor=rjbBullColor, border_color=color.new(rjbBullColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1,
         text=plotLabelRJB ? _rjbLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bullBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bullBoxesRJB))
        array.push(_bullBoxesRJB, _bullboxRJB)

if plotRJB
    _controlBox(_bearBoxesRJB, high, low, _rjb)
    _controlBox(_bullBoxesRJB, high, low, _rjb)

//////////////////// Crossovers a.k.a. Break of Structure ////////////////////
//Bullish BOS Box Plotting
if plotBOS
    if ta.crossover(useHighLowForBullishBoS ? high : close, top)
        _bullboxBOS = box.new(left=bar_index, top=top, right=bosBoxFlag ? bar_index+bosBoxLength : bar_index+1, bottom=bottom, bgcolor=bosBullColor, border_color=color.new(bosBullColor, bosBorderTransparency), border_style=bosBoxBorder, border_width=1,
         text=plotLabelBOS ? _bosLabel + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=bosLabelSize, text_color=bosLabelColor)
        if array.size(_bullBoxesBOS) > bosMaxBoxSet
            box.delete(array.shift(_bullBoxesBOS))
        array.push(_bullBoxesBOS, _bullboxBOS)

//Bearish BOS Box Plotting
if plotBOS
    if ta.crossunder(useHighLowForBearishBoS ? low : close, bottom)
        _bearboxBOS = box.new(left=bar_index, top=top, right=bosBoxFlag ? bar_index+bosBoxLength : bar_index+1, bottom=bottom, bgcolor=bosBearColor, border_color=color.new(bosBearColor, bosBorderTransparency), border_style=bosBoxBorder, border_width=1,
         text=plotLabelBOS ? _bosLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=bosLabelSize, text_color=bosLabelColor)
        if array.size(_bearBoxesBOS) > bosMaxBoxSet
            box.delete(array.shift(_bearBoxesBOS))
        array.push(_bearBoxesBOS, _bearboxBOS)

if plotBOS
    _controlBox(_bearBoxesBOS, high, low, _bos)
    _controlBox(_bullBoxesBOS, high, low, _bos)

//////////////////// Premium Premium & Discount Discount //////////////////
premiumPremium = plotPPDD and isObDown(0) and ((math.max(high, high[1]) > top and close < top) or (math.max(high, high[1]) > top[1] and close < top[1]))
discountDiscount = plotPPDD and isObUp(0) and ((math.min(low, low[1]) < bottom and close > bottom) or (math.min(low, low[1]) < bottom[1] and close > bottom[1]))
plotshape(premiumPremium, "Bearish PPDD OB", style=shape.triangledown , location=location.abovebar, color=ppddBearColor, size=size.tiny)
plotshape(discountDiscount, "Bullish PPDD OB", style=shape.triangleup , location=location.belowbar, color=ppddBullColor, size=size.tiny)

premiumPremium1 = plotPPDD and (isUp(1) and isDown(0) and close[0] < open[1]) and ((math.max(high, high[1]) > top and close < top) or (math.max(high, high[1]) > top[1] and close < top[1])) and not premiumPremium
discountDiscount1 = plotPPDD and (isDown(1) and isUp(0) and close[0] > open[1]) and ((math.min(low, low[1]) < bottom and close > bottom) or (math.min(low, low[1]) < bottom[1] and close > bottom[1])) and not discountDiscount
plotshape(premiumPremium1, "Bearish PPDD Weak OB", style=shape.xcross, location=location.abovebar, color=ppddBearColor, size=size.tiny)
plotshape(discountDiscount1, "Bullish PPDD Weak OB", style=shape.xcross, location=location.belowbar, color=ppddBullColor, size=size.tiny)

////////////////// High Volume Bars //////////////////
volEma = ta.ema(volume, hvbEMAPeriod)
isHighVolume = volume > (hvbMultiplier * volEma)
barcolor(plotHVB and isUp(0) and isHighVolume ? hvbBullColor : na, title="Bullish HVB")
barcolor(plotHVB and isDown(0) and isHighVolume ? hvbBearColor : na, title="Bearish HVB")

///////////////// Stacked OB + FVG //////////////////
plotshape(plotOBFVG and isFvgDown(0) and isObDown(1), "Bearish OB+FVG Stack", style=shape.diamond, location=location.abovebar, color=obfvgBearColor, size=size.tiny)
plotshape(plotOBFVG and isFvgUp(0) and isObUp(1), "Bullish OB+FVG Stack", style=shape.diamond, location=location.belowbar, color=obfvgBullColor, size=size.tiny)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (or/rb/fvg finder)                                           ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (divergences)                                                 ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


prd2 = input.int(defval=5, title='Pivot Period', minval=1, maxval=50, group='=== DIVERGENCE SETTINGS ===')
source2 = input.string(defval='Close', title='Source for Pivot Points', options=['Close', 'High/Low'], group='=== DIVERGENCE SETTINGS ===')
searchdiv = input.string(defval='Regular', title='Divergence Type', options=['Regular', 'Hidden', 'Regular/Hidden'], group='=== DIVERGENCE SETTINGS ===')
showindis = input.string(defval='Full', title='Show Indicator Names', options=['Full', 'First Letter', 'Don\'t Show'], group='=== DIVERGENCE SETTINGS ===')
showlimit = input.int(1, title='Minimum Number of Divergence', minval=1, maxval=11, group='=== DIVERGENCE SETTINGS ===')
maxpp = input.int(defval=10, title='Maximum Pivot Points to Check', minval=1, maxval=20, group='=== DIVERGENCE SETTINGS ===')
maxbars = input.int(defval=100, title='Maximum Bars to Check', minval=30, maxval=200, group='=== DIVERGENCE SETTINGS ===')
shownum = input(defval=true, title='Show Divergence Number', group='=== DIVERGENCE SETTINGS ===')
showlast = input(defval=true, title='Show Only Last Divergence', group='=== DIVERGENCE SETTINGS ===')
dontconfirm = input(defval=true, title='Don\'t Wait for Confirmation', group='=== DIVERGENCE SETTINGS ===')
showlines = input(defval=false, title='Show Divergence Lines', group='=== DIVERGENCE SETTINGS ===')
showpivot = input(defval=false, title='Show Pivot Points', group='=== DIVERGENCE SETTINGS ===')
calcmacd = input(defval=false, title='MACD', group='=== DIVERGENCE SETTINGS ===')
calcmacda = input(defval=false, title='MACD Histogram', group='=== DIVERGENCE SETTINGS ===')
calcrsi = input(defval=true, title='RSI', group='=== DIVERGENCE SETTINGS ===')
calcstoc = input(defval=true, title='Stochastic', group='=== DIVERGENCE SETTINGS ===')
calccci = input(defval=false, title='CCI', group='=== DIVERGENCE SETTINGS ===')
calcmom = input(defval=true, title='Momentum', group='=== DIVERGENCE SETTINGS ===')
calcobv = input(defval=true, title='OBV', group='=== DIVERGENCE SETTINGS ===')
calcvwmacd = input(true, title='VWmacd', group='=== DIVERGENCE SETTINGS ===')
calccmf = input(false, title='Chaikin Money Flow', group='=== DIVERGENCE SETTINGS ===')
calcmfi = input(false, title='Money Flow Index', group='=== DIVERGENCE SETTINGS ===')
calcext = input(false, title='Check External Indicator', group='=== DIVERGENCE SETTINGS ===')
externalindi = input(defval=close, title='External Indicator', group='=== DIVERGENCE SETTINGS ===')
pos_reg_div_col = input.color(defval=color.new(color=#4caf50, transp=60), title='Positive Regular Divergence', group='=== DIVERGENCE SETTINGS ===')
neg_reg_div_col = input.color(defval=color.new(color=#ef5350, transp=60), title='Negative Regular Divergence', group='=== DIVERGENCE SETTINGS ===')
pos_hid_div_col = input(defval=color.lime, title='Positive Hidden Divergence', group='=== DIVERGENCE SETTINGS ===')
neg_hid_div_col = input(defval=color.red, title='Negative Hidden Divergence', group='=== DIVERGENCE SETTINGS ===')
pos_div_text_col = input(defval=color.white, title='Positive Divergence Text Color', group='=== DIVERGENCE SETTINGS ===')
neg_div_text_col = input(defval=color.white, title='Negative Divergence Text Color', group='=== DIVERGENCE SETTINGS ===')
reg_div_l_style_ = input.string(defval='Solid', title='Regular Divergence Line Style', options=['Solid', 'Dashed', 'Dotted'], group='=== DIVERGENCE SETTINGS ===')
hid_div_l_style_ = input.string(defval='Dashed', title='Hdden Divergence Line Style', options=['Solid', 'Dashed', 'Dotted'], group='=== DIVERGENCE SETTINGS ===')
reg_div_l_width = input.int(defval=2, title='Regular Divergence Line Width', minval=1, maxval=5, group='=== DIVERGENCE SETTINGS ===')
hid_div_l_width = input.int(defval=1, title='Hidden Divergence Line Width', minval=1, maxval=5, group='=== DIVERGENCE SETTINGS ===')



// set line styles
var reg_div_l_style = reg_div_l_style_ == 'Solid' ? line.style_solid : reg_div_l_style_ == 'Dashed' ? line.style_dashed : line.style_dotted
var hid_div_l_style = hid_div_l_style_ == 'Solid' ? line.style_solid : hid_div_l_style_ == 'Dashed' ? line.style_dashed : line.style_dotted


// get indicators
rsi = ta.rsi(close, 14)  // RSI
[macd, signal, deltamacd] = ta.macd(close, 12, 26, 9)  // MACD
moment = ta.mom(close, 10)  // Momentum
cci = ta.cci(close, 10)  // CCI
Obv = ta.obv  // OBV
stk = ta.sma(ta.stoch(close, high, low, 14), 3)  // Stoch
maFast = ta.vwma(close, 12)  // volume weighted macd
maSlow = ta.vwma(close, 26)
vwmacd = maFast - maSlow
Cmfm = (close - low - (high - close)) / (high - low)  // Chaikin money flow
Cmfv = Cmfm * volume
cmf = ta.sma(Cmfv, 21) / ta.sma(volume, 21)
Mfi = ta.mfi(close, 14)  // Moneyt Flow Index

// keep indicators names and colors in arrays
var indicators_name = array.new_string(11)
var div_colors = array.new_color(4)
if barstate.isfirst
    // names
    array.set(indicators_name, 0, showindis == 'Full' ? 'MACD' : 'M')
    array.set(indicators_name, 1, showindis == 'Full' ? 'Hist' : 'H')
    array.set(indicators_name, 2, showindis == 'Full' ? 'RSI' : 'E')
    array.set(indicators_name, 3, showindis == 'Full' ? 'Stoch' : 'S')
    array.set(indicators_name, 4, showindis == 'Full' ? 'CCI' : 'C')
    array.set(indicators_name, 5, showindis == 'Full' ? 'MOM' : 'M')
    array.set(indicators_name, 6, showindis == 'Full' ? 'OBV' : 'O')
    array.set(indicators_name, 7, showindis == 'Full' ? 'VWMACD' : 'V')
    array.set(indicators_name, 8, showindis == 'Full' ? 'CMF' : 'C')
    array.set(indicators_name, 9, showindis == 'Full' ? 'MFI' : 'M')
    array.set(indicators_name, 10, showindis == 'Full' ? 'Extrn' : 'X')
    //colors
    array.set(div_colors, 0, pos_reg_div_col)
    array.set(div_colors, 1, neg_reg_div_col)
    array.set(div_colors, 2, pos_hid_div_col)
    array.set(div_colors, 3, neg_hid_div_col)

// Check if we get new Pivot High Or Pivot Low
float ph2 = ta.pivothigh(source2 == 'Close' ? close : high, prd2, prd2)
float pl2 = ta.pivotlow(source2 == 'Close' ? close : low, prd2, prd2)
plotshape(ph2 and showpivot, text='H', style=shape.labeldown, color=color.new(color.white, 100), textcolor=color.new(color.red, 0), location=location.abovebar, offset=-prd2)
plotshape(pl2 and showpivot, text='L', style=shape.labelup, color=color.new(color.white, 100), textcolor=color.new(color.lime, 0), location=location.belowbar, offset=-prd2)

// keep values and positions of Pivot Highs/Lows in the arrays
var int maxarraysize = 20
var ph2_positions = array.new_int(maxarraysize, 0)
var pl2_positions = array.new_int(maxarraysize, 0)
var ph2_vals = array.new_float(maxarraysize, 0.)
var pl2_vals = array.new_float(maxarraysize, 0.)

// add ph2s to the array
if ph2
    array.unshift(ph2_positions, bar_index)
    array.unshift(ph2_vals, ph2)
    if array.size(ph2_positions) > maxarraysize
        array.pop(ph2_positions)
        array.pop(ph2_vals)

// add pl2s to the array
if pl2
    array.unshift(pl2_positions, bar_index)
    array.unshift(pl2_vals, pl2)
    if array.size(pl2_positions) > maxarraysize
        array.pop(pl2_positions)
        array.pop(pl2_vals)

// functions to check Regular Divergences and Hidden Divergences

// function to check positive regular or negative hidden divergence
// cond == 1 => positive_regular, cond == 2=> negative_hidden
positive_regular_positive_hidden_divergence(src, cond) =>
    divlen = 0
    prsc = source2 == 'Close' ? close : low
    // if indicators higher than last value and close price is higher than las close
    if dontconfirm or src > src[1] or close > close[1]
        startpoint = dontconfirm ? 0 : 1  // don't check last candle
        // we search last 15 PPs
        for x = 0 to maxpp - 1 by 1
            len = bar_index - array.get(pl2_positions, x) + prd2
            // if we reach non valued array element or arrived 101. or previous bars then we don't search more
            if array.get(pl2_positions, x) == 0 or len > maxbars
                break
            if len > 5 and (cond == 1 and src[startpoint] > src[len] and prsc[startpoint] < nz(array.get(pl2_vals, x)) or cond == 2 and src[startpoint] < src[len] and prsc[startpoint] > nz(array.get(pl2_vals, x)))
                slope1 = (src[startpoint] - src[len]) / (len - startpoint)
                virtual_line1 = src[startpoint] - slope1
                slope2 = (close[startpoint] - close[len]) / (len - startpoint)
                virtual_line2 = close[startpoint] - slope2
                arrived = true
                for y = 1 + startpoint to len - 1 by 1
                    if src[y] < virtual_line1 or nz(close[y]) < virtual_line2
                        arrived := false
                        break
                    virtual_line1 -= slope1
                    virtual_line2 -= slope2
                    virtual_line2

                if arrived
                    divlen := len
                    break
    divlen

// function to check negative regular or positive hidden divergence
// cond == 1 => negative_regular, cond == 2=> positive_hidden
negative_regular_negative_hidden_divergence(src, cond) =>
    divlen = 0
    prsc = source2 == 'Close' ? close : high
    // if indicators higher than last value and close price is higher than las close
    if dontconfirm or src < src[1] or close < close[1]
        startpoint = dontconfirm ? 0 : 1  // don't check last candle
        // we search last 15 PPs
        for x = 0 to maxpp - 1 by 1
            len = bar_index - array.get(ph2_positions, x) + prd2
            // if we reach non valued array element or arrived 101. or previous bars then we don't search more
            if array.get(ph2_positions, x) == 0 or len > maxbars
                break
            if len > 5 and (cond == 1 and src[startpoint] < src[len] and prsc[startpoint] > nz(array.get(ph2_vals, x)) or cond == 2 and src[startpoint] > src[len] and prsc[startpoint] < nz(array.get(ph2_vals, x)))
                slope1 = (src[startpoint] - src[len]) / (len - startpoint)
                virtual_line1 = src[startpoint] - slope1
                slope2 = (close[startpoint] - nz(close[len])) / (len - startpoint)
                virtual_line2 = close[startpoint] - slope2
                arrived = true
                for y = 1 + startpoint to len - 1 by 1
                    if src[y] > virtual_line1 or nz(close[y]) > virtual_line2
                        arrived := false
                        break
                    virtual_line1 -= slope1
                    virtual_line2 -= slope2
                    virtual_line2

                if arrived
                    divlen := len
                    break
    divlen

// calculate 4 types of divergence if enabled in the options and return divergences in an array
calculate_divs(cond, indicator_1) =>
    divs = array.new_int(4, 0)
    array.set(divs, 0, cond and (searchdiv == 'Regular' or searchdiv == 'Regular/Hidden') ? positive_regular_positive_hidden_divergence(indicator_1, 1) : 0)
    array.set(divs, 1, cond and (searchdiv == 'Regular' or searchdiv == 'Regular/Hidden') ? negative_regular_negative_hidden_divergence(indicator_1, 1) : 0)
    array.set(divs, 2, cond and (searchdiv == 'Hidden' or searchdiv == 'Regular/Hidden') ? positive_regular_positive_hidden_divergence(indicator_1, 2) : 0)
    array.set(divs, 3, cond and (searchdiv == 'Hidden' or searchdiv == 'Regular/Hidden') ? negative_regular_negative_hidden_divergence(indicator_1, 2) : 0)
    divs

// array to keep all divergences
var all_divergences = array.new_int(44)  // 11 indicators * 4 divergence = 44 elements
// set related array elements
array_set_divs(div_pointer, index) =>
    for x = 0 to 3 by 1
        array.set(all_divergences, index * 4 + x, array.get(div_pointer, x))

// set divergences array
array_set_divs(calculate_divs(calcmacd, macd), 0)
array_set_divs(calculate_divs(calcmacda, deltamacd), 1)
array_set_divs(calculate_divs(calcrsi, rsi), 2)
array_set_divs(calculate_divs(calcstoc, stk), 3)
array_set_divs(calculate_divs(calccci, cci), 4)
array_set_divs(calculate_divs(calcmom, moment), 5)
array_set_divs(calculate_divs(calcobv, Obv), 6)
array_set_divs(calculate_divs(calcvwmacd, vwmacd), 7)
array_set_divs(calculate_divs(calccmf, cmf), 8)
array_set_divs(calculate_divs(calcmfi, Mfi), 9)
array_set_divs(calculate_divs(calcext, externalindi), 10)

// check minimum number of divergence, if less than showlimit then delete all divergence
total_div = 0
for x = 0 to array.size(all_divergences) - 1 by 1
    total_div += math.round(math.sign(array.get(all_divergences, x)))
    total_div

if total_div < showlimit
    array.fill(all_divergences, 0)

// keep line in an array
var pos_div_lines = array.new_line(0)
var neg_div_lines = array.new_line(0)
var pos_div_labels = array.new_label(0)
var neg_div_labels = array.new_label(0)

// remove old lines and labels if showlast option is enabled
delete_old_pos_div_lines() =>
    if array.size(pos_div_lines) > 0
        for j = 0 to array.size(pos_div_lines) - 1 by 1
            line.delete(array.get(pos_div_lines, j))
        array.clear(pos_div_lines)

delete_old_neg_div_lines() =>
    if array.size(neg_div_lines) > 0
        for j = 0 to array.size(neg_div_lines) - 1 by 1
            line.delete(array.get(neg_div_lines, j))
        array.clear(neg_div_lines)

delete_old_pos_div_labels() =>
    if array.size(pos_div_labels) > 0
        for j = 0 to array.size(pos_div_labels) - 1 by 1
            label.delete(array.get(pos_div_labels, j))
        array.clear(pos_div_labels)

delete_old_neg_div_labels() =>
    if array.size(neg_div_labels) > 0
        for j = 0 to array.size(neg_div_labels) - 1 by 1
            label.delete(array.get(neg_div_labels, j))
        array.clear(neg_div_labels)

// delete last creted lines and labels until we met new ph2/PV
delete_last_pos_div_lines_label(n) =>
    if n > 0 and array.size(pos_div_lines) >= n
        asz = array.size(pos_div_lines)
        for j = 1 to n by 1
            line.delete(array.get(pos_div_lines, asz - j))
            array.pop(pos_div_lines)
        if array.size(pos_div_labels) > 0
            label.delete(array.get(pos_div_labels, array.size(pos_div_labels) - 1))
            array.pop(pos_div_labels)

delete_last_neg_div_lines_label(n) =>
    if n > 0 and array.size(neg_div_lines) >= n
        asz = array.size(neg_div_lines)
        for j = 1 to n by 1
            line.delete(array.get(neg_div_lines, asz - j))
            array.pop(neg_div_lines)
        if array.size(neg_div_labels) > 0
            label.delete(array.get(neg_div_labels, array.size(neg_div_labels) - 1))
            array.pop(neg_div_labels)

// variables for Alerts
pos_reg_div_detected = false
neg_reg_div_detected = false
pos_hid_div_detected = false
neg_hid_div_detected = false

// to remove lines/labels until we met new // ph2/pl2
var last_pos_div_lines = 0
var last_neg_div_lines = 0
var remove_last_pos_divs = false
var remove_last_neg_divs = false
if pl2
    remove_last_pos_divs := false
    last_pos_div_lines := 0
    last_pos_div_lines
if ph2
    remove_last_neg_divs := false
    last_neg_div_lines := 0
    last_neg_div_lines

// draw divergences lines and labels
divergence_text_top = ''
divergence_text_bottom = ''
distances = array.new_int(0)
dnumdiv_top = 0
dnumdiv_bottom = 0
top_label_col = color.white
bottom_label_col = color.white
old_pos_divs_can_be_removed = true
old_neg_divs_can_be_removed = true
startpoint = dontconfirm ? 0 : 1  // used for don't confirm option

for x = 0 to 10 by 1
    div_type = -1
    for y = 0 to 3 by 1
        if array.get(all_divergences, x * 4 + y) > 0  // any divergence?
            div_type := y
            if y % 2 == 1
                dnumdiv_top += 1
                top_label_col := array.get(div_colors, y)
                top_label_col
            if y % 2 == 0
                dnumdiv_bottom += 1
                bottom_label_col := array.get(div_colors, y)
                bottom_label_col
            if not array.includes(distances, array.get(all_divergences, x * 4 + y))  // line not exist ?
                array.push(distances, array.get(all_divergences, x * 4 + y))
                new_line = showlines ? line.new(x1=bar_index - array.get(all_divergences, x * 4 + y), y1=source2 == 'Close' ? close[array.get(all_divergences, x * 4 + y)] : y % 2 == 0 ? low[array.get(all_divergences, x * 4 + y)] : high[array.get(all_divergences, x * 4 + y)], x2=bar_index - startpoint, y2=source2 == 'Close' ? close[startpoint] : y % 2 == 0 ? low[startpoint] : high[startpoint], color=array.get(div_colors, y), style=y < 2 ? reg_div_l_style : hid_div_l_style, width=y < 2 ? reg_div_l_width : hid_div_l_width) : na
                if y % 2 == 0
                    if old_pos_divs_can_be_removed
                        old_pos_divs_can_be_removed := false
                        if not showlast and remove_last_pos_divs
                            delete_last_pos_div_lines_label(last_pos_div_lines)
                            last_pos_div_lines := 0
                            last_pos_div_lines
                        if showlast
                            delete_old_pos_div_lines()
                    array.push(pos_div_lines, new_line)
                    last_pos_div_lines += 1
                    remove_last_pos_divs := true
                    remove_last_pos_divs

                if y % 2 == 1
                    if old_neg_divs_can_be_removed
                        old_neg_divs_can_be_removed := false
                        if not showlast and remove_last_neg_divs
                            delete_last_neg_div_lines_label(last_neg_div_lines)
                            last_neg_div_lines := 0
                            last_neg_div_lines
                        if showlast
                            delete_old_neg_div_lines()
                    array.push(neg_div_lines, new_line)
                    last_neg_div_lines += 1
                    remove_last_neg_divs := true
                    remove_last_neg_divs

            // set variables for alerts
            if y == 0
                pos_reg_div_detected := true
                pos_reg_div_detected
            if y == 1
                neg_reg_div_detected := true
                neg_reg_div_detected
            if y == 2
                pos_hid_div_detected := true
                pos_hid_div_detected
            if y == 3
                neg_hid_div_detected := true
                neg_hid_div_detected
    // get text for labels
    if div_type >= 0
        divergence_text_top += (div_type % 2 == 1 ? showindis != 'Don\'t Show' ? array.get(indicators_name, x) + '\n' : '' : '')
        divergence_text_bottom += (div_type % 2 == 0 ? showindis != 'Don\'t Show' ? array.get(indicators_name, x) + '\n' : '' : '')
        divergence_text_bottom


// draw labels
if showindis != 'Don\'t Show' or shownum
    if shownum and dnumdiv_top > 0
        divergence_text_top += str.tostring(dnumdiv_top)
        divergence_text_top
    if shownum and dnumdiv_bottom > 0
        divergence_text_bottom += str.tostring(dnumdiv_bottom)
        divergence_text_bottom
    if divergence_text_top != ''
        if showlast
            delete_old_neg_div_labels()
        array.push(neg_div_labels, label.new(x=bar_index, y=math.max(high, high[1]), text=divergence_text_top, color=top_label_col, textcolor=neg_div_text_col, style=label.style_label_down))

    if divergence_text_bottom != ''
        if showlast
            delete_old_pos_div_labels()
        array.push(pos_div_labels, label.new(x=bar_index, y=math.min(low, low[1]), text=divergence_text_bottom, color=bottom_label_col, textcolor=pos_div_text_col, style=label.style_label_up))


alertcondition(pos_reg_div_detected, title='Positive Regular Divergence Detected', message='Positive Regular Divergence Detected')
alertcondition(neg_reg_div_detected, title='Negative Regular Divergence Detected', message='Negative Regular Divergence Detected')
alertcondition(pos_hid_div_detected, title='Positive Hidden Divergence Detected', message='Positive Hidden Divergence Detected')
alertcondition(neg_hid_div_detected, title='Negative Hidden Divergence Detected', message='Negative Hidden Divergence Detected')

alertcondition(pos_reg_div_detected or pos_hid_div_detected, title='Positive Divergence Detected', message='Positive Divergence Detected')
alertcondition(neg_reg_div_detected or neg_hid_div_detected, title='Negative Divergence Detected', message='Negative Divergence Detected')


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (divergences)                                                ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


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
// ║                That's all Folks !                                            ║
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