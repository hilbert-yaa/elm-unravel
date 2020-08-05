module Level6.Text exposing(..)

import Types

text1 = {content = "Hello, nice to meet you !", top = 20, left = 45, opacity = 0, size = 1.5, event = {name = Types.Noop , init = 0 , duration = 200}}

text2 = {content = "Are you a new resident here?", top = 20, left = 45, opacity = 0, size = 1.5, event = {name = Types.Noop , init = 0 , duration = 200}}

text3 = {content = "What a nice day.", top = 20, left = 45, opacity = 0, size = 1.5, event = {name = Types.Noop , init = 0 , duration = 200}}
-- 需要自己设定的有content , top 和上边界的距离， left 和左边界的距离， duration 显示的时长