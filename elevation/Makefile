# First download the DEMs and Extract
USGS_NED_13_n44w072_ArcGrid.zip:
	curl -o USGS_NED_13_n44w072_ArcGrid.zip 'ftp://rockyftp.cr.usgs.gov/vdelivery/Datasets/Staged/Elevation/13/ArcGrid/USGS_NED_13_n44w072_ArcGrid.zip'

USGS_NED_13_n44w072_ArcGrid: USGS_NED_13_n44w072_ArcGrid.zip
	unzip -d USGS_NED_13_n44w072_ArcGrid USGS_NED_13_n44w072_ArcGrid.zip
	touch USGS_NED_13_n44w072_ArcGrid

USGS_NED_13_n45w072_ArcGrid.zip:
	curl -o USGS_NED_13_n45w072_ArcGrid.zip 'ftp://rockyftp.cr.usgs.gov/vdelivery/Datasets/Staged/Elevation/13/ArcGrid/USGS_NED_13_n45w072_ArcGrid.zip'

USGS_NED_13_n45w072_ArcGrid: USGS_NED_13_n45w072_ArcGrid.zip
	unzip -d USGS_NED_13_n45w072_ArcGrid USGS_NED_13_n45w072_ArcGrid.zip
	touch USGS_NED_13_n45w072_ArcGrid

# Combine the DEMs into a single file
combined.tif: USGS_NED_13_n44w072_ArcGrid USGS_NED_13_n45w072_ArcGrid
	gdal_merge.py -o combined.tif USGS_NED_13_n44w072_ArcGrid/grdn44w072_13/w001001.adf USGS_NED_13_n45w072_ArcGrid/grdn45w072_13/w001001.adf

# Make a geojson with contours every 40 feet and save the elevation as index
contour-feet.tmp.geojson: combined.tif
	gdal_contour -a index -f geojson combined.tif contour-feet.geojson -i 12.19

contour-feet.geojson:
	python meters_to_feet.py

contour-feet.tmp.shp: combined.tif
	gdal_contour -a index combined.tif contour-feet.tmp.shp -i 12.19

contour-feet.shp: contour-feet.tmp.shp
	python meters_to_feet_shp.py

#for upload to mapbox
contour-feet.zip: contour-feet.shp
	zip contour-feet.zip contour-feet.cpg contour-feet.dbf contour-feet.prj contour-feet.shp contour-feet.shp

combined-halfed.tif: combined.tif
	gdalwarp -ts 5406 0 -r lanczos combined.tif combined-halfed.tif

contour-halfed-feet.tmp.shp: combined-halfed.tif
	gdal_contour -a index combined-halfed.tif contour-halfed-feet.tmp.shp -i 12.19

contour-halfed-feet.shp: contour-halfed-feet.tmp.shp
	python meters_to_feet_shp.py contour-halfed-feet.tmp.shp contour-halfed-feet.shp

upload.zip: contour-halfed-feet.shp
	zip upload.zip contour-halfed-feet.cpg contour-halfed-feet.dbf contour-halfed-feet.prj contour-halfed-feet.shp contour-halfed-feet.shx
