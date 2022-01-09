--Importing all the libraries needed for the beginner kit
local path = ... .. '.'
local sti = require (path .. 'sti')
local anim8 = require(path .. 'anim8')
Beginner = {}

--Function creating the new world using love physics
function Beginner:newWorld(--[[Map Path]]map,--[[Number]]xg?: number,--[[Number]]yg)
    local Map = sti(map)
    Beginner.world = love.physics.newWorld(xg,yg)
end