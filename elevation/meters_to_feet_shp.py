import fiona
import click

#with fiona.drivers():
#    with fiona.open('contour-feet.tmp.shp') as source:
#        meta = source.meta
#        with fiona.open('contour-feet.shp', 'w', **meta) as sink:
#            for f in source:
#                f['properties']['index'] = f['properties']['index'] / 12.19*40
#                sink.write(f)


@click.command()
@click.argument('inf')
@click.argument('outf')
def convert(inf, outf):
    with fiona.drivers():
        with fiona.open(inf) as source:
            meta = source.meta
            with fiona.open(outf, 'w', **meta) as sink:
                for f in source:
                    f['properties']['index'] = f['properties']['index'] / 12.19*40
                    sink.write(f)

if __name__ == '__main__':
    convert()
