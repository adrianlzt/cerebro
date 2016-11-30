#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""

"""

x = 400
y = 300

import pygame, sys

bkg = (255, 211, 0)
clr = (0, 0, 0)
squ = (8, 11, 134)

pygame.init()
size = (800, 600)
screen = pygame.display.set_mode(size)
pygame.display.set_caption("Bloxy")
pygame.key.set_repeat(1, 1)
font = pygame.font.SysFont("Stencil", 20)
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    keys_pressed = pygame.key.get_pressed()

    if keys_pressed[pygame.K_LEFT]:
        x -= 5
    if keys_pressed[pygame.K_RIGHT]:
        x += 5
    if keys_pressed[pygame.K_UP]:
        y -= 5
    if keys_pressed[pygame.K_DOWN]:
        y += 5

    if x > 800:
        x = 0
    if x < 0:
        x = 800
    if y > 600:
        y = 0
    if y < 0:
        y = 600

    screen.fill(bkg)
    text = font.render('(' + str(x) + ',' + str(y) + ')', True, clr)
    screen.blit(text, [10, 10])
    pygame.draw.rect(screen, squ, [x - 10, y - 10, 20, 20])

    pygame.display.flip()
    clock.tick(60)
