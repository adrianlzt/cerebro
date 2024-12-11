# 3D

Tipo CAD:
FreeCAD (open source)
SolidWorks
Catia
Fusion 360

Modelización:
blender (open source)
rinoceros 3d
3ds Max
Cinema 4D

"Volumétricos"
TinkerCAD (online)
Sketchup
SolidWorks for kids

# Slicers

Cura (open source)
Parece el mas usado.
aur/cura-bin

Slicer for prusa (open source)
Simplify 3d (de pago)

Z-Suite (única opción para las Zortrax). Windows y MAC.
<https://support.zortrax.com/downloads/software/>
Para las Zortrax también se puede usar el Cura y luego convertir el gcode a .zcode con <https://support.zortrax.com/how-to-use-the-gcode-converter/> <https://support.zortrax.com/downloads/#:~:text=Software-,GCODE%20CONVERTER,-An%20easy%20tool>
<https://forum.zortrax.com/t/how-to-use-cura-to-zortrax-m200/11827>

Markerware (para las MakerBot)

## Conceptos

### Raft / adhesion / base

In 3D printing, a raft is a temporary, flat base layer printed _underneath_ the main print object. It's used to improve the adhesion of the first layer of the print to the print bed, especially with materials that have poor adhesion or on surfaces that are not perfectly level.

The raft is typically a wider, thicker base than the object itself, providing a larger contact area with the build plate. Once the print is complete, the raft is easily removed, freeing the finished object. Rafts are often used for:

- **Improving first layer adhesion:** This is the primary reason for using a raft. A large, flat base ensures good contact and prevents warping or peeling of the first layer.
- **Printing on difficult surfaces:** Rafts are particularly helpful when printing on surfaces that aren't perfectly smooth or level.
- **Printing small, delicate objects:** The increased surface area helps to support the print and prevent it from detaching.

While rafts solve adhesion issues, they add extra printing time and material consumption. Other methods like brims or skirts can also improve first layer adhesion and might be preferred when a raft's added complexity isn't necessary.
