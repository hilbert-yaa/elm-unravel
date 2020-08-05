module Level5.Text exposing(..)

import Types

text1 = {content = "It's so cold ...", top = 20, left = 45, opacity = 0, size = 2, event = {name = Types.Noop , init = 0 , duration = 200}}

text2 = {content = "Help me ...", top = 20, left = 45, opacity = 0, size = 2, event = {name = Types.Noop , init = 0 , duration = 200}}

-- 需要自己设定的有content , top 和上边界的距离， left 和左边界的距离， duration 显示的时长