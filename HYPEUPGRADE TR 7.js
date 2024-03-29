//©HYPEUPGRADETR (based multible sources, modified and optimised by HYPEUPGRADETR)
//@version=5

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║ WVAP	                                                                      ║
// ║ RSI Candle                                                                   ║
// ║ Imbalance                                                                    ║
// ║                                                                              ║
// ║ developer : HYPEUPGRADETR                                                    ║
// ║ creators  : HYPEUPGRADETR													  ║
// ║                                                                              ║
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
// GRN01 = #7CFC00, GRN02 = #32CD32, GRN03 = #228B22, GRN04 = #006400, GRN05 = #008000, GRN06=#093507
// RED01 = #FF4500, RED02 = #FF0000, RED03 = #B22222, RED04 = #8B0000, RED05 = #800000, RED06=#330d06

// ──────────[ v3 Style Colors ]
// AQUA    = #00FFFF
// BLACK   = #000000
// BLUE    = #0000FF
// FUCHSIA = #FF00FF
// GRAY    = #808080
// GREEN   = #008000
// LIME    = #00FF00
// MAROON  = #800000
// NAVY    = #000080
// OLIVE   = #808000
// ORANGE  = #FF7F00
// PURPLE  = #800080
// RUBI    = #FF0000
// SILVER  = #C0C0C0
// TEAL    = #008080
// YELLOW  = #FFFF00
// WHITE   = #FFFFFF

// ╔══════════════════════════════════════╗
// ║                                      ║
// ║     indicator functions              ║
// ║                                      ║
// ╚══════════════════════════════════════╝

indicator("HYPEUPGRADETR 7", overlay = true, format=format.price, max_lines_count=500, max_boxes_count = 500, max_labels_count = 500)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (market sessions)                                             ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// Box generation code inspired by Jos(TradingCode), session box visuals inspired by @boitoki

// Session 1 - user inputs
showTokyo      = input.bool(true, '', inline='Tokyo', group='Sessions')
stringTokyo    = input.string('Asia Range', '', inline='Tokyo', group='Sessions')
TokyoTimeX     = input.session(defval="0430-1100", title='     ', inline='Tokyo2', group='Sessions', tooltip = 'If you want to change the start/end time of the session, just make sure they are in UTC. There is no need to change the timezone of your Tradingview chart or to change the Timezone input below, because the sessions will be plotted correctly as long as the start/end time is set in UTC.')
TokyoCol       = input.color(color.rgb(187, 19, 61, 90), '' , inline='Tokyo', group='Sessions')
// Session 2 - user inputs
showLondon     = input.bool(true, '', inline='London', group='Sessions')
stringLondon   = input.string('London', '', inline='London', group='Sessions')
LondonTimeX    = input.session(defval="1100-1930", title='     ', inline='London2', group='Sessions', tooltip = 'If you want to change the start/end time of the session, just make sure they are in UTC. There is no need to change the timezone of your Tradingview chart or to change the Timezone input below, because the sessions will be plotted correctly as long as the start/end time is set in UTC.')
LondonCol      = input.color(color.rgb(93, 96, 107, 90), '' , inline='London', group='Sessions')
// Session 3 - user inputs
showNewYork    = input.bool(true, title='', inline='New York', group='Sessions')
stringNewYork  = input.string('New York', '', inline='New York', group='Sessions')
NewYorkTimeX   = input.session(defval="1730-0000", title='     ', inline='New York2', group='Sessions', tooltip = 'If you want to change the start/end time of the session, just make sure they are in UTC. There is no need to change the timezone of your Tradingview chart or to change the Timezone input below, because the sessions will be plotted correctly as long as the start/end time is set in UTC.')
NewYorkCol     = input.color(color.rgb(93, 96, 107, 90), '', inline='New York', group='Sessions')
// Session 4 - user inputs
showSydney     = input.bool(false, title='', inline='Sydney', group='Sessions')
stringSydney   = input.string('Sydney', '', inline='Sydney', group='Sessions')
SydneyTimeX    = input.session(defval="2100-0600", title='     ', inline='Sydney2', group='Sessions', tooltip = 'If you want to change the start/end time of the session, just make sure they are in UTC. There is no need to change the timezone of your Tradingview chart or to change the Timezone input below, because the sessions will be plotted correctly as long as the start/end time is set in UTC.')
SydneyCol      = input.color(color.rgb(164, 97, 187, 90), '', inline='Sydney', group='Sessions')
// Additional tools and settings - user inputs
pipChange      = input.bool(false, 'Change (Pips)', inline='0', group = 'Additional Tools and Settings')
percentChange  = input.bool(false, 'Change (%)', inline='0', group = 'Additional Tools and Settings')
merge          = input.bool(false, 'Merge Overlaps', inline='2', group = 'Additional Tools and Settings')
hideWeekends   = input.bool(true, 'Hide Weekends', inline='2', group = 'Additional Tools and Settings')
sessionOC      = input.bool(true, 'Open/Close Line', inline='3', group = 'Additional Tools and Settings')
halfline       = input.bool(false, 'Session 0.5 Level', inline='3', group = 'Additional Tools and Settings')
colorcandles   = input.bool(false, 'Color Candles', inline='4', group = 'Additional Tools and Settings')
showScreener   = input.bool(false, 'Screener (Soon)', inline='4', group = 'Additional Tools and Settings')
displayType    = input.string('Boxes', 'Display Type', options = ['Boxes', 'Zones','Timeline', 'Candles'], group='Additional Tools and Settings', tooltip='Choose whether the scripts should plot session in the for of boxes or colored background zones.')
daysBack       = input.float(150, 'Lookback (Days)', group='Additional Tools and Settings', tooltip= 'This inputs defines the lookback period for plotting sessions. Eg. If it is set to 1, only the sessions of the past day will appear')
changeType     = input.string('Session High/Low','Change (%/Pips) Source', options = ['Session High/Low', 'Session Open/Close'], group='Additional Tools and Settings', tooltip='Choose whether the Change (%) and Change (Pips) should measure the distance between Session High and Session Low or the distance between Session Open and Session Close.')
SessionZone    = input.string("UTC+3", title="Input Timezone", group='Additional Tools and Settings', tooltip = 'This input is defining the timezone for the session times selected above. It has nothing to do with the timezone of your chart, because the sessions will be plotted correctly even if your chart is not set to UTC.')
// Appearance - user inputs
borderWidth    = input.int(1, 'Box Border', inline='border', group='Appearance')
borderStyle    = input.string('Dotted', '', ['Solid', 'Dashed', 'Dotted']  , inline='border', group='Appearance', tooltip='Select the width and style of session box borders')
levelsStyle    = input.string('Dashed', 'Line Style', ['Solid', 'Dashed', 'Dotted'], group='Appearance', tooltip='Select the style of 0.5 and Open/Close lines.')
labelSize      = input.string('Normal', 'Label Size', options = ['Auto', 'Tiny', 'Small', 'Normal'], group='Appearance', tooltip='Select the size of text labels.')
showLabels     = input.bool(true, 'Session Labels', inline='00', group = 'Appearance')
colorBoxes     = input.bool(true, 'Box Background', inline='00', group = 'Appearance')

// Excluding or Including Weekends
var TokyoTime   = hideWeekends ? TokyoTimeX+":123456" : TokyoTimeX+":1234567"
var LondonTime  = hideWeekends ? LondonTimeX+":123456" : LondonTimeX+":1234567"
var NewYorkTime = hideWeekends ? NewYorkTimeX+":123456" : NewYorkTimeX+":1234567"
var SydneyTime  = hideWeekends ? SydneyTimeX+":123456" : SydneyTimeX+":1234567"

// Defining Line Style and Label Size Variables
lineStyle(x) =>
    switch x
        'Solid'  => line.style_solid
        'Dashed' => line.style_dashed
        'Dotted' => line.style_dotted
labelStyle(x) =>
    switch x
        'Auto'   => size.auto
        'Tiny'   => size.tiny
        'Small'  => size.small
        'Normal' => size.normal

// Calculating inRange, used for lookback
MSPD        = 24 * 60 * 60 * 1000
lastBarDate = timestamp(year(timenow), month(timenow), dayofmonth(timenow), hour(timenow), minute(timenow), second(timenow))
thisBarDate = timestamp(year, month, dayofmonth, hour, minute, second)
daysLeft    = math.abs(math.floor((lastBarDate - thisBarDate) / MSPD))
inRange     = daysLeft < daysBack

// Session Time
InTokyo(TokyoTime, TokyoTimeZone=syminfo.timezone)       =>
    not na(time(timeframe.period, TokyoTime, SessionZone))
InLondon(LondonTime, LondonTimeZone=syminfo.timezone)    =>
    not na(time(timeframe.period, LondonTime, SessionZone))
InNewYork(NewYorkTime, NewYorkTimeZone=syminfo.timezone) =>
    not na(time(timeframe.period, NewYorkTime, SessionZone))
InSydney(SydneyTime, SydneyTimeZone=syminfo.timezone)    =>
    not na(time(timeframe.period, SydneyTime, SessionZone))

// Creating variables Session High, Low, Open and Session Boxes, Lines and Texts
var TokyoHighPrice     = 0.0, var TokyoLowPrice      = 0.0, var TokyoOpenPrice     = 0.0, var box TokyoBox       = na, var line TokyoLine     = na, var label TokyoLabel   = na, var line TokyoOC       = na, var string TokyoText   = str.tostring(stringTokyo)
var LondonHighPrice    = 0.0, var LondonLowPrice     = 0.0, var LondonOpenPrice    = 0.0, var box LondonBox      = na, var line LondonLine    = na, var label LondonLabel  = na, var line LondonOC      = na, var string LondonText  = str.tostring(stringLondon)
var NewYorkHighPrice   = 0.0, var NewYorkLowPrice    = 0.0, var NewYorkOpenPrice   = 0.0, var box NewYorkBox     = na, var line NewYorkLine   = na, var label NewYorkLabel = na, var line NewYorkOC     = na, var string NewYorkText = str.tostring(stringNewYork)
var SydneyHighPrice    = 0.0, var SydneyLowPrice     = 0.0, var SydneyOpenPrice    = 0.0, var box SydneyBox      = na, var line SydneyLine    = na, var label SydneyLabel  = na, var line SydneyOC      = na, var string SydneyText  = str.tostring(stringSydney)

// Checking if session is active/has started
inTokyo        = InTokyo(TokyoTime, SessionZone)     and timeframe.isintraday
TokyoStart     = inTokyo   and not inTokyo[1]
inLondon       = InLondon(LondonTime, SessionZone)   and timeframe.isintraday
LondonStart    = inLondon  and not inLondon[1]
inNewYork      = InNewYork(NewYorkTime, SessionZone) and timeframe.isintraday
NewYorkStart   = inNewYork and not inNewYork[1]
inSydney       = InSydney(SydneyTime, SessionZone)   and timeframe.isintraday
SydneyStart    = inSydney  and not inSydney[1]

// Settings high, low, open at the beggining of the session
if TokyoStart
    TokyoHighPrice   := high
    TokyoLowPrice    := low
    TokyoOpenPrice   := open
if LondonStart
    LondonHighPrice  := high
    LondonLowPrice   := low
    LondonOpenPrice  := open
if NewYorkStart
    NewYorkHighPrice := high
    NewYorkLowPrice  := low
    NewYorkOpenPrice := open
if SydneyStart
    SydneyHighPrice  := high
    SydneyLowPrice   := low
    SydneyOpenPrice  := open

// Track session's max high and max low during the session
else if inTokyo
    TokyoHighPrice   := math.max(TokyoHighPrice, high)
    TokyoLowPrice    := math.min(TokyoLowPrice, low)
else if inLondon
    LondonHighPrice  := math.max(LondonHighPrice, high)
    LondonLowPrice   := math.min(LondonLowPrice, low)
else if inNewYork
    NewYorkHighPrice := math.max(NewYorkHighPrice, high)
    NewYorkLowPrice  := math.min(NewYorkLowPrice, low)
else if inSydney
    SydneyHighPrice  := math.max(SydneyHighPrice, high)
    SydneyLowPrice   := math.min(SydneyLowPrice, low)

// Plotting session boxes at the beginning of each session
if TokyoStart and showTokyo and inRange
    TokyoBox     := displayType=='Boxes' ? box.new(left=bar_index, top=na, right=na, bottom=na, border_width=borderWidth, bgcolor = colorBoxes ? TokyoCol : na, border_style = lineStyle(borderStyle), border_color=color.new(TokyoCol, 40)) : na
    TokyoLine    := halfline   ? line.new(x1=bar_index, y1=na, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(TokyoCol, 40)) : na
    TokyoLabel   := showLabels ? label.new(x=na, y=na, text=TokyoText, textcolor=color.new(TokyoCol, 40), color=color.rgb(0,0,0,100), size=labelStyle(labelSize)) : na
    TokyoOC      := sessionOC  ? line.new(x1=bar_index, y1=TokyoOpenPrice, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(TokyoCol, 40)) : na
if LondonStart and showLondon and inRange
    LondonBox    := displayType=='Boxes' ? box.new(left=bar_index, top=na, right=na, bottom=na, border_width=borderWidth, bgcolor = colorBoxes ? LondonCol : na, border_style = lineStyle(borderStyle), border_color=color.new(LondonCol, 40)) : na
    LondonLine   := halfline   ? line.new(x1=bar_index, y1=na, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(LondonCol, 40)) : na
    LondonLabel  := showLabels ? label.new(x=na, y=na, text=LondonText, textcolor=color.new(LondonCol, 40), color=color.rgb(0,0,0,100), size=labelStyle(labelSize)) : na
    LondonOC     := sessionOC  ? line.new(x1=bar_index, y1=LondonOpenPrice, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(LondonCol, 40)) : na
if NewYorkStart and showNewYork and inRange
    NewYorkBox   := displayType=='Boxes' ? box.new(left=bar_index, top=na, right=na, bottom=na, border_width=borderWidth, bgcolor = colorBoxes ? NewYorkCol : na, border_style = lineStyle(borderStyle), border_color=color.new(NewYorkCol, 40)) : na
    NewYorkLine  := halfline   ? line.new(x1=bar_index, y1=na, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(NewYorkCol, 40)) : na
    NewYorkLabel := showLabels ? label.new(x=na, y=na, text=NewYorkText, textcolor=color.new(NewYorkCol, 40), color=color.rgb(0,0,0,100), size=labelStyle(labelSize)) : na
    NewYorkOC    := sessionOC  ? line.new(x1=bar_index, y1=NewYorkOpenPrice, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(NewYorkCol, 40)) : na
if SydneyStart and showSydney and inRange
    SydneyBox    := displayType=='Boxes' ? box.new(left=bar_index, top=na, right=na, bottom=na, border_width=borderWidth, bgcolor = colorBoxes ? SydneyCol : na, border_style = lineStyle(borderStyle), border_color=color.new(SydneyCol, 40)) : na
    SydneyLine   := halfline   ? line.new(x1=bar_index, y1=na, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(SydneyCol, 40)) : na
    SydneyLabel  := showLabels ? label.new(x=na, y=na, text=SydneyText, textcolor=color.new(SydneyCol, 40), color=color.rgb(0,0,0,100), size=labelStyle(labelSize)) : na
    SydneyOC     := sessionOC  ? line.new(x1=bar_index, y1=SydneyOpenPrice, x2=na, y2=na, style=lineStyle(levelsStyle), color = color.new(SydneyCol, 40)) : na

// Creating variables for alternative Sessions Box top and bottom (used for merging sessions)
var float TokyoHighM   = 0, var float TokyoLowM    = 0, var float LondonHighM  = 0, var float LondonLowM   = 0, var float NewYorkHighM = 0, var float NewYorkLowM  = 0, var float SydneyHighM  = 0, var float SydneyLowM   = 0

// Updating session boxes during sessions
if inTokyo and inRange
    TokyoHighPrice   := math.max(TokyoHighPrice, high)
    TokyoLowPrice    := math.min(TokyoLowPrice, low)
    box.set_top(TokyoBox, TokyoHighPrice)
    box.set_bottom(TokyoBox, TokyoLowPrice)
    box.set_right(TokyoBox, bar_index + 1)
    label.set_x(TokyoLabel, (box.get_left(TokyoBox)+box.get_right(TokyoBox))/2)
    label.set_y(TokyoLabel, TokyoHighPrice)
    if sessionOC
        line.set_x2(TokyoOC, bar_index)
        line.set_y2(TokyoOC, close)
    if halfline
        line.set_y1(TokyoLine, (TokyoHighPrice+TokyoLowPrice)/2)
        line.set_y2(TokyoLine, (TokyoHighPrice+TokyoLowPrice)/2)
        line.set_x2(TokyoLine, bar_index+1)
    if merge and not inLondon and showLondon
        TokyoHighM := TokyoHighPrice
        TokyoLowM  := TokyoLowPrice
    if merge and inLondon and showLondon
        box.set_top(TokyoBox, TokyoHighM)
        box.set_bottom(TokyoBox, TokyoLowM)
        label.set_y(TokyoLabel, TokyoHighM)
        box.set_right(TokyoBox, (box.get_left(LondonBox)))
        line.set_x2(TokyoLine, (box.get_left(LondonBox)))
        label.set_x(TokyoLabel, (box.get_left(TokyoBox)+box.get_right(TokyoBox))/2)
        line.set_x2(TokyoOC, (box.get_left(LondonBox)))
        line.set_y2(TokyoOC, LondonOpenPrice)
        line.set_y1(TokyoLine, (TokyoHighM+TokyoLowM)/2)
        line.set_y2(TokyoLine, (TokyoHighM+TokyoLowM)/2)
    var float pips = 0
    var float chg = 0
    pips := changeType=='Session High/Low' ? ((TokyoHighPrice - TokyoLowPrice) / syminfo.mintick / 10) : ((close - TokyoOpenPrice) / syminfo.mintick / 10)
    chg  := changeType=='Session Open/Close' ? (100 * (close - TokyoOpenPrice) / TokyoOpenPrice) : ((TokyoHighPrice - TokyoLowPrice) / TokyoLowPrice * 100)
    if percentChange and not pipChange
        label.set_text(TokyoLabel, str.tostring(TokyoText) + '  (' + str.tostring(chg, format.percent) + ')')
    if pipChange and not percentChange
        label.set_text(TokyoLabel, str.tostring(TokyoText) + '  (' + str.tostring(pips) + ')')
    if percentChange and pipChange
        label.set_text(TokyoLabel, str.tostring(TokyoText) + '  ('+ str.tostring(chg, format.percent)+ ' • ' + str.tostring(pips) + ')')
if inLondon and inRange
    LondonHighPrice  := math.max(LondonHighPrice, high)
    LondonLowPrice   := math.min(LondonLowPrice, low)
    box.set_top(LondonBox, LondonHighPrice)
    box.set_bottom(LondonBox, LondonLowPrice)
    box.set_right(LondonBox, bar_index+1)
    label.set_x(LondonLabel, (box.get_left(LondonBox)+box.get_right(LondonBox))/2)
    label.set_y(LondonLabel, LondonHighPrice)
    if sessionOC
        line.set_x2(LondonOC, bar_index)
        line.set_y2(LondonOC, close)
    if halfline
        line.set_y1(LondonLine, (LondonHighPrice+LondonLowPrice)/2)
        line.set_y2(LondonLine, (LondonHighPrice+LondonLowPrice)/2)
        line.set_x2(LondonLine, bar_index+1)
    if merge and not inNewYork and showNewYork
        LondonHighM := LondonHighPrice
        LondonLowM  := LondonLowPrice
    if merge and inNewYork and showNewYork
        box.set_top(LondonBox, LondonHighM)
        box.set_bottom(LondonBox, LondonLowM)
        label.set_y(LondonLabel, LondonHighM)
        box.set_right(LondonBox, (box.get_left(NewYorkBox)))
        line.set_x2(LondonLine, (box.get_left(NewYorkBox)))
        label.set_x(LondonLabel, (box.get_left(LondonBox)+box.get_right(LondonBox))/2)
        line.set_x2(LondonOC, (box.get_left(NewYorkBox)))
        line.set_y2(LondonOC, NewYorkOpenPrice)
        line.set_y1(LondonLine, (LondonHighM+LondonLowM)/2)
        line.set_y2(LondonLine, (LondonHighM+LondonLowM)/2)
    var float pips = 0
    var float chg = 0
    pips := changeType=='Session High/Low' ? ((LondonHighPrice - LondonLowPrice) / syminfo.mintick / 10) : ((close - LondonOpenPrice) / syminfo.mintick / 10)
    chg  := changeType=='Session Open/Close' ? (100 * (close - LondonOpenPrice) / LondonOpenPrice) : ((LondonHighPrice - LondonLowPrice) / LondonLowPrice * 100)
    if percentChange and not pipChange
        label.set_text(LondonLabel, str.tostring(LondonText) + '  (' + str.tostring(chg, format.percent) + ')')
    if pipChange and not percentChange
        label.set_text(LondonLabel, str.tostring(LondonText) + '  (' + str.tostring(pips) + ')')
    if percentChange and pipChange
        label.set_text(LondonLabel, str.tostring(LondonText) + '  ('+ str.tostring(chg, format.percent)+ ' • ' + str.tostring(pips) + ')')
if inNewYork and inRange
    NewYorkHighPrice  := math.max(NewYorkHighPrice, high)
    NewYorkLowPrice   := math.min(NewYorkLowPrice, low)
    box.set_top(NewYorkBox, NewYorkHighPrice)
    box.set_bottom(NewYorkBox, NewYorkLowPrice)
    box.set_right(NewYorkBox, bar_index + 1)
    label.set_x(NewYorkLabel, (box.get_left(NewYorkBox)+box.get_right(NewYorkBox))/2)
    label.set_y(NewYorkLabel, NewYorkHighPrice)
    if sessionOC
        line.set_x2(NewYorkOC, bar_index)
        line.set_y2(NewYorkOC, close)
    if halfline
        line.set_y1(NewYorkLine, (NewYorkHighPrice+NewYorkLowPrice)/2)
        line.set_y2(NewYorkLine, (NewYorkHighPrice+NewYorkLowPrice)/2)
        line.set_x2(NewYorkLine, bar_index+1)
    if merge and not inSydney and showSydney
        NewYorkHighM := NewYorkHighPrice
        NewYorkLowM  := NewYorkLowPrice
    if merge and inSydney and showSydney
        box.set_top(NewYorkBox, NewYorkHighM)
        box.set_bottom(NewYorkBox, NewYorkLowM)
        label.set_y(NewYorkLabel, NewYorkHighM)
        box.set_right(NewYorkBox, (box.get_left(SydneyBox)))
        line.set_x2(NewYorkLine, (box.get_left(SydneyBox)))
        label.set_x(NewYorkLabel, (box.get_left(NewYorkBox)+box.get_right(NewYorkBox))/2)
        line.set_x2(NewYorkOC, (box.get_left(SydneyBox)))
        line.set_y2(NewYorkOC, SydneyOpenPrice)
        line.set_y1(NewYorkLine, (NewYorkHighM+NewYorkLowM)/2)
        line.set_y2(NewYorkLine, (NewYorkHighM+NewYorkLowM)/2)
    var float pips = 0
    var float chg = 0
    pips := changeType=='Session High/Low' ? ((NewYorkHighPrice - NewYorkLowPrice) / syminfo.mintick / 10) : ((close - NewYorkOpenPrice) / syminfo.mintick / 10)
    chg  := changeType=='Session Open/Close' ? (100 * (close - NewYorkOpenPrice) / NewYorkOpenPrice) : ((NewYorkHighPrice - NewYorkLowPrice) / NewYorkLowPrice * 100)
    if percentChange and not pipChange
        label.set_text(NewYorkLabel, str.tostring(NewYorkText) + '  (' + str.tostring(chg, format.percent) + ')')
    if pipChange and not percentChange
        label.set_text(NewYorkLabel, str.tostring(NewYorkText) + '  (' + str.tostring(pips) + ')')
    if percentChange and pipChange
        label.set_text(NewYorkLabel, str.tostring(NewYorkText) + '  ('+ str.tostring(chg, format.percent)+ ' • ' + str.tostring(pips) + ')')
if inSydney and inRange
    SydneyHighPrice  := math.max(SydneyHighPrice, high)
    SydneyLowPrice   := math.min(SydneyLowPrice, low)
    box.set_top(SydneyBox, SydneyHighPrice)
    box.set_bottom(SydneyBox, SydneyLowPrice)
    box.set_right(SydneyBox, bar_index + 1)
    label.set_x(SydneyLabel, (box.get_left(SydneyBox)+box.get_right(SydneyBox))/2)
    label.set_y(SydneyLabel, SydneyHighPrice)
    if sessionOC
        line.set_x2(SydneyOC, bar_index)
        line.set_y2(SydneyOC, close)
    if halfline
        line.set_y1(SydneyLine, (SydneyHighPrice+SydneyLowPrice)/2)
        line.set_y2(SydneyLine, (SydneyHighPrice+SydneyLowPrice)/2)
        line.set_x2(SydneyLine, bar_index+1)
    if merge and not inTokyo and showTokyo
        SydneyHighM := SydneyHighPrice
        SydneyLowM  := SydneyLowPrice
    if merge and inTokyo and showTokyo
        box.set_top(SydneyBox, SydneyHighM)
        box.set_bottom(SydneyBox, SydneyLowM)
        label.set_y(SydneyLabel, SydneyHighM)
        box.set_right(SydneyBox, (box.get_left(TokyoBox)))
        line.set_x2(SydneyLine, (box.get_left(TokyoBox)))
        label.set_x(SydneyLabel, (box.get_left(SydneyBox)+box.get_right(SydneyBox))/2)
        line.set_x2(SydneyOC, (box.get_left(TokyoBox)))
        line.set_y2(SydneyOC, TokyoOpenPrice)
        line.set_y1(SydneyLine, (SydneyHighM+SydneyLowM)/2)
        line.set_y2(SydneyLine, (SydneyHighM+SydneyLowM)/2)
    var float pips = 0
    var float chg = 0
    pips := changeType=='Session High/Low' ? ((SydneyHighPrice - SydneyLowPrice) / syminfo.mintick / 10) : ((close - SydneyOpenPrice) / syminfo.mintick / 10)
    chg  := changeType=='Session Open/Close' ? (100 * (close - SydneyOpenPrice) / SydneyOpenPrice) : ((SydneyHighPrice - SydneyLowPrice) / SydneyLowPrice * 100)
    if percentChange and not pipChange
        label.set_text(SydneyLabel, str.tostring(SydneyText) + '  (' + str.tostring(chg, format.percent) + ')')
    if pipChange and not percentChange
        label.set_text(SydneyLabel, str.tostring(SydneyText) + '  (' + str.tostring(pips) + ')')
    if percentChange and pipChange
        label.set_text(SydneyLabel, str.tostring(SydneyText) + '  ('+ str.tostring(chg, format.percent)+ ' • ' + str.tostring(pips) + ')')

// Coloring candles
TKLO = showLondon  ? (not inLondon)  : true
LONY = showNewYork ? (not inNewYork) : true
NYSY = showSydney  ? (not inSydney)  : true
SYTK = showTokyo   ? (not inTokyo)   : true
barcolor((colorcandles or displayType=='Candles') and not merge and  showTokyo   and inTokyo   and inRange          ? color.new(TokyoCol, 40) : na, editable = false)
barcolor((colorcandles or displayType=='Candles') and not merge and  showLondon  and inLondon  and inRange          ? color.new(LondonCol, 40) : na, editable = false)
barcolor((colorcandles or displayType=='Candles') and not merge and  showNewYork and inNewYork and inRange          ? color.new(NewYorkCol, 40) : na, editable = false)
barcolor((colorcandles or displayType=='Candles') and not merge and  showSydney  and inNewYork and inRange          ? color.new(SydneyCol, 40) : na, editable = false)
barcolor((colorcandles or displayType=='Candles') and merge     and  showTokyo   and inTokyo   and TKLO and inRange ? color.new(TokyoCol, 40) : na, editable = false)
barcolor((colorcandles or displayType=='Candles') and merge     and  showLondon  and inLondon  and LONY and inRange ? color.new(LondonCol, 40) : na, editable = false)
barcolor((colorcandles or displayType=='Candles') and merge     and  showNewYork and inNewYork and NYSY and inRange ? color.new(NewYorkCol, 40) : na, editable = false)
barcolor((colorcandles or displayType=='Candles') and merge     and  showSydney  and inSydney  and SYTK and inRange ? color.new(SydneyCol, 40) : na, editable = false)

// Coloring background if displayType=='Zones'
TokyoT              = time(timeframe.period, TokyoTime)
LondonT             = time(timeframe.period, LondonTime)
NewYorkT            = time(timeframe.period, NewYorkTime)
SydneyT             = time(timeframe.period, SydneyTime)
bgcolor(displayType == 'Zones' and not merge and showTokyo   and inRange and  time == TokyoT   ? TokyoCol   : na, editable = false)
bgcolor(displayType == 'Zones' and not merge and showLondon  and inRange and  time == LondonT  ? LondonCol  : na, editable = false)
bgcolor(displayType == 'Zones' and not merge and showNewYork and inRange and  time == NewYorkT ? NewYorkCol : na, editable = false)
bgcolor(displayType == 'Zones' and not merge and showSydney  and inRange and  time == SydneyT  ? SydneyCol  : na, editable = false)
bgcolor(displayType == 'Zones' and merge and not inLondon  and showTokyo   and inRange and  time == TokyoT   ? TokyoCol   : na, editable = false)
bgcolor(displayType == 'Zones' and merge and not inNewYork and showLondon  and inRange and  time == LondonT  ? LondonCol  : na, editable = false)
bgcolor(displayType == 'Zones' and merge and not inSydney  and showNewYork and inRange and  time == NewYorkT ? NewYorkCol : na, editable = false)
bgcolor(displayType == 'Zones' and merge and not inTokyo   and showSydney  and inRange and  time == SydneyT  ? SydneyCol  : na, editable = false)

// Plotting sessions in Timeline form
plotshape(displayType=='Timeline' and (merge and showLondon  ? (showTokyo   and inTokyo   and not inLondon)  : showTokyo   and inTokyo),   style=shape.square, color=TokyoCol,   location = location.bottom, size=size.auto)
plotshape(displayType=='Timeline' and (merge and showNewYork ? (showLondon  and inLondon  and not inNewYork) : showLondon  and inLondon),  style=shape.square, color=LondonCol,  location = location.bottom, size=size.auto)
plotshape(displayType=='Timeline' and (merge and showSydney  ? (showNewYork and inNewYork and not inSydney)  : showNewYork and inNewYork), style=shape.square, color=NewYorkCol, location = location.bottom, size=size.auto)
plotshape(displayType=='Timeline' and (merge and showTokyo   ? (showSydney  and inSydney  and not inTokyo)   : showSydney  and inSydney),  style=shape.square, color=SydneyCol,  location = location.bottom, size=size.auto)

// Creating alerts
alertcondition(inTokyo   and not inTokyo[1], 'Tokyo Open', 'The Tokyo Session has started')
alertcondition(inLondon  and not inLondon[1], 'London Open', 'The London Session has started')
alertcondition(inNewYork and not inNewYork[1], 'New York Open', 'The New York Session has started')
alertcondition(inSydney  and not inSydney[1], 'Sydney Open', 'The Sydney Session has started')
alertcondition(high > TokyoHighPrice[0]    and inTokyo, 'Tokyo Session - New High', 'New High in Tokyo Session')
alertcondition(high > LondonHighPrice[0]   and inLondon, 'London Session - New High', 'New High in London Session')
alertcondition(high > NewYorkHighPrice[0]  and inNewYork, 'New York Session - New High', 'New High in New York Session')
alertcondition(high > SydneyHighPrice[0]   and inSydney, 'Sydney Session - New High', 'New High in Sydney Session')
alertcondition(low  > TokyoLowPrice[0]     and inTokyo, 'Tokyo Session - New Low', 'New Low in Tokyo Session')
alertcondition(low  > LondonLowPrice[0]    and inLondon, 'London Session - New Low', 'New Low in London Session')
alertcondition(low  > NewYorkLowPrice[0]   and inNewYork, 'New York Session - New Low', 'New Low In New York Session')
alertcondition(low  > SydneyLowPrice[0]    and inSydney, 'Sydney Session - New Low', 'New Low In Sydney Session')


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (market sessions)                                            ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (wvap)          			                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ----------------------------------------
groupVWAP = "Volume Weighted Average Price"
// ----------------------------------------

computeVWAP(src, isNewPeriod) =>
    var float sumSrcVol = na
    var float sumVol = na
    var float sumSrcSrcVol = na
    var float _lvwap = na

    sumSrcVol := isNewPeriod ? src * volume : src * volume + sumSrcVol[1]
    sumVol := isNewPeriod ? volume : volume + sumVol[1]
    // sumSrcSrcVol calculates the dividend of the equation that is later used to calculate the standard deviation
    sumSrcSrcVol := isNewPeriod ? volume * math.pow(src, 2) : volume * math.pow(src, 2) + sumSrcSrcVol[1]

    _vwap = sumSrcVol / sumVol
    variance = sumSrcSrcVol / sumVol - math.pow(_vwap, 2)
    variance := variance < 0 ? 0 : variance
    stDev = math.sqrt(variance)
    _lvwap := isNewPeriod ? _vwap[1] : _lvwap[1]

    [_vwap, stDev, _lvwap]

// ----------------------------------------

f_drawLabel(_x, _y, _text, _textcolor, _style, _size) =>
    var _label = label.new(
     x          = _x,
     y          = _y,
     text       = _text,
     textcolor  = _textcolor,
     style      = _style,
     size       = _size,
     xloc       = xloc.bar_time
     )

    label.set_xy(_label, _x, _y)

// ----------------------------------------

src = input(hlc3, title="VWAP Source", inline="V0", group=groupVWAP)

pvD_color = input.color(color.new(#089981, 0), title="", inline="V1", group=groupVWAP)
pvW_color = input.color(color.new(#2962ff, 0), title="", inline="V2", group=groupVWAP)
pvM_color = input.color(color.new(#ff9800, 0), title="", inline="V3", group=groupVWAP)
pvQ_color = input.color(color.new(#3BBC54, 0), title="", inline="V4", group=groupVWAP)
pvY_color = input.color(color.new(#2665BD, 0), title="", inline="V5", group=groupVWAP)

plot_pvD = input(true, title="Prev."                    , inline="V1", group=groupVWAP)
plot_pvW = input(true, title="Prev."                    , inline="V2", group=groupVWAP)
plot_pvM = input(false, title="Prev."                    , inline="V3", group=groupVWAP)
plot_pvQ = input(false, title="Prev."                    , inline="V4", group=groupVWAP)
plot_pvY = input(false, title="Prev."                    , inline="V5", group=groupVWAP)

vD_color = input.color(color.new(#089981, 0), title=""    , inline="V1", group=groupVWAP)
vW_color = input.color(color.new(#2962ff, 0), title=""    , inline="V2", group=groupVWAP)
vM_color = input.color(color.new(#ff9800, 0), title=""    , inline="V3", group=groupVWAP)
vQ_color = input.color(color.new(#3BBC54, 0), title=""    , inline="V4", group=groupVWAP)
vY_color = input.color(color.new(#2665BD, 0), title=""    , inline="V5", group=groupVWAP)

plot_vD = input(true, title="Show Daily VWAP"            , inline="V1", group=groupVWAP)
plot_vW = input(true, title="Show Weekly VWAP"            , inline="V2", group=groupVWAP)
plot_vM = input(false, title="Show Monthly VWAP"        , inline="V3", group=groupVWAP)
plot_vQ = input(false, title="Show Quarterly VWAP"        , inline="V4", group=groupVWAP)
plot_vY = input(false, title="Show Yearly VWAP"            , inline="V5", group=groupVWAP)

vR_color        = input.color(color.new(#000000, 0)    , title=""                    , inline="V6", group=groupVWAP)
rolling_sv        = input(false                            , title="Show Rolling VWAP"    , inline="V6", group=groupVWAP)
rolling_period    = input.int(200                            , title=""                    , inline="V6", group=groupVWAP)

vwap_r = ta.vwma(src, rolling_period)

line_width_VWAP = input.int(1, minval=0, title="Lines Width", inline="V0A", group=groupVWAP)
line_width_pVWAP = line_width_VWAP

Vstyle = input(true, title="Circles Style", inline="V0A", group=groupVWAP)

VstyleC = Vstyle ? plot.style_line : plot.style_line
VstylepC = Vstyle ? plot.style_cross : plot.style_stepline

// ----------------------------------------
groupL = "Labels"
// ----------------------------------------

show_labels = input(false, title="Show Labels |", inline="L1", group=groupL)
show_VWAPlabels = input(true, title="VWAP", inline="L1", group=groupL)
show_pVWAPlabels = input(true, title="Previous", inline="L1", group=groupL)

off_mult = input(15, title="Labels Offset", inline="L2", group=groupL)
var DEFAULT_LABEL_SIZE    = size.normal
var DEFAULT_LABEL_STYLE    = label.style_none
ll_offset = timenow + math.round(ta.change(time) * off_mult)

// ----------------------------------------

timeChange(period) =>
    ta.change(time(period))

newSessionD = timeChange("D")
newSessionW = timeChange("W")
newSessionM = timeChange("M")
newSessionQ = timeChange("3M")
newSessionY = timeChange("12M")

[vD, stdevD, pvD] = computeVWAP(src, newSessionD)
[vW, stdevW, pvW] = computeVWAP(src, newSessionW)
[vM, stdevM, pvM] = computeVWAP(src, newSessionM)
[vQ, stdevQ, pvQ] = computeVWAP(src, newSessionQ)
[vY, stdevY, pvY] = computeVWAP(src, newSessionY)

// ----------------------------------------

vRplot = plot(rolling_sv ? vwap_r : na, title="VWAP - Rolling"    , color=vR_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and rolling_sv ? vwap_r : na, "rV", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vDplot = plot(plot_vD ? vD : na, title="VWAP - Daily"    , color=vD_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vD ? vD : na, "vD", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vWplot = plot(plot_vW ? vW : na, title="VWAP - Weekly"    , color=vW_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vW ? vW : na, "vW", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vMplot = plot(plot_vM ? vM : na, title="VWAP - Monthly"    , color=vM_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vM ? vM : na, "vM", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vQplot = plot(plot_vQ ? vQ : na, title="VWAP - Quarter"    , color=vQ_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vQ ? vQ : na, "vQ", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vYplot = plot(plot_vY ? vY : na, title="VWAP - Year"    , color=vY_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vY ? vY : na, "vY", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

// ----------------------------------------

pvDplot = plot(plot_pvD ? pvD : na, title="pVWAP - Daily"    , color=pvD_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvD ? pvD : na, "pvD", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvWplot = plot(plot_pvW ? pvW : na, title="pVWAP - Weekly"    , color=pvW_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvW ? pvW : na, "pvW", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvMplot = plot(plot_pvM ? pvM : na, title="pVWAP - Monthly"    , color=pvM_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvM ? pvM : na, "pvM", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvQplot = plot(plot_pvQ ? pvQ : na, title="pVWAP - Quarter"    , color=pvQ_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvQ ? pvQ : na, "pvQ", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvYplot = plot(plot_pvY ? pvY : na, title="pVWAP - Year"    , color=pvY_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvY ? pvY : na, "pvY", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (wvap)          			                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (dynamic imbalance)                                           ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

var box[]   top_boxes     = array.new_box()
var box[]   bottom_boxes     = array.new_box()
var box[]   tested_obs = array.new_box()
var bool matched = false

color imb = color.new(#630cff,70)
color imb_tested = color.new(color.red,60)

tf = timeframe.isdaily ? 1440 : (timeframe.isweekly ? 1440*7 : (timeframe.ismonthly ? 1440*7*30 : 1))
reqDate = timenow - 199999999*timeframe.multiplier*tf
Imbcol = input.color(imb, 'Imbalance Color', inline="1" ,group='=== Information ===')
Imbcol_tested = input.color(imb_tested, 'Mitigated Imbalance', inline="2" ,group='=== Information ===')
imb_extend = input.bool(false, "Auto-extend Untested imbalance",group='=== Information ===')
TopImbalance = low[2] <= open[1] and high[0] >= close[1]
TopImbalancesize = low[2] - high[0]
if TopImbalance and TopImbalancesize > 0 and time >= reqDate
    BOX1 = box.new(left=bar_index[1], top=low[2], right=bar_index[0], bottom=high[0])
    box.set_bgcolor(BOX1, Imbcol )
    box.set_border_color(BOX1, na )
    array.push(top_boxes, BOX1)

BottomInbalance = high[2] >= open[1] and low[0] <= close[1]
BottomInbalancesize = low[0] - high[2]
if BottomInbalance and BottomInbalancesize > 0 and time >= reqDate
    BOX2 = box.new(left=bar_index[1], top=low[0], right=bar_index[0], bottom=high[2])
    box.set_bgcolor(BOX2, Imbcol )
    box.set_border_color(BOX2, na )
    array.push(bottom_boxes, BOX2)

if barstate.isconfirmed
    if array.size(top_boxes) > 0
        for i = array.size(top_boxes) - 1 to 0 by 1
            tbox = array.get(top_boxes, i)
            top = box.get_top(tbox)
            bottom = box.get_bottom(tbox)
            ago = box.get_left(tbox)
            if imb_extend
                box.set_right(tbox, bar_index)
            if high > top
                box.set_bgcolor(tbox, Imbcol_tested)
                if imb_extend
                    box.set_right(tbox, ago+1)
                array.remove(top_boxes, i)
                continue
            if high > bottom //and ago < 5000
                matched := false
                asize = array.size(tested_obs)
                if asize > 0
                    for j = asize - 1 to 0 by 1
                        tbox2 = array.get(tested_obs, j)
                        ago2 = box.get_left(tbox2)
                        if ago==ago2
                            matched := true
                            box.set_bottom(tbox, high)
                            if imb_extend
                                box.set_right(tbox, ago+1)
                            box.set_top(tbox2, high)
                            break
                if not matched
                    BOX3 = box.copy(tbox)
                    box.set_top(BOX3, high)
                    box.set_bgcolor(BOX3, Imbcol_tested)
                    if imb_extend
                        box.set_right(BOX3, ago+1)
                    array.push(tested_obs, BOX3)
                    box.set_bottom(tbox, high)

    if array.size(bottom_boxes) > 0
        for i = array.size(bottom_boxes) - 1 to 0 by 1
            tbox = array.get(bottom_boxes, i)
            top = box.get_top(tbox)
            bottom = box.get_bottom(tbox)
            ago = box.get_left(tbox)
            if imb_extend
                box.set_right(tbox, bar_index)
            if low < bottom
                box.set_bgcolor(tbox, Imbcol_tested)
                if imb_extend
                    box.set_right(tbox, ago+1)
                array.remove(bottom_boxes, i)
                continue
            if low < top //and ago < 5000
                matched := false
                asize = array.size(tested_obs)
                if asize > 0
                    for j = asize - 1 to 0 by 1
                        tbox2 = array.get(tested_obs, j)
                        ago2 = box.get_left(tbox2)
                        if ago==ago2
                            matched := true
                            box.set_top(tbox, low)
                            box.set_bottom(tbox2, low)
                            break
                if not matched
                    BOX4 = box.copy(tbox)
                    box.set_bottom(BOX4, low)
                    box.set_bgcolor(BOX4, Imbcol_tested)
                    if imb_extend
                        box.set_right(BOX4, ago+1)
                    array.push(tested_obs, BOX4)
                    box.set_top(tbox, low)


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (dynamic imbalance)                                          ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (rsi candle)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

src3 = close
len = input.int(14, minval=1, title='Length')
up = ta.rma(math.max(ta.change(src3), 0), len)
down = ta.rma(-math.min(ta.change(src3), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)

//coloring method below

src1 = close
len1 = input.int(70, minval=1, title='UpLevel')
src2 = close
len2 = input.int(30, minval=1, title='DownLevel')
isup() =>
    rsi > len1
isdown() =>
    rsi < len2
isdown_1 = isdown()
barcolor(isup() ? color.yellow : isdown_1 ? color.yellow : na)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (rsi candle)                                                 ║
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