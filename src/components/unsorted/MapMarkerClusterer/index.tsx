import {
  MarkerClusterer,
  MarkerClustererF,
  MarkerClustererProps,
  MarkerProps,
} from '@react-google-maps/api';
import { Children, FC, ReactElement } from 'react';

type MapMarkerClustererProps = Omit<MarkerClustererProps, 'children'> & {
  children:
    | ReactElement<Pick<MarkerProps, 'clusterer'>>
    | ReactElement<Pick<MarkerProps, 'clusterer'>>[];
};

export const MapMarkerClusterer: FC<MapMarkerClustererProps> = ({
  children,
  ...rest
}) => {
  if (!children || Children.count(children) === 0) {
    return null;
  }

  if (Children.count(children) === 1) {
    return <>{children}</>;
  }

  return (
    <MarkerClusterer zoomOnClick {...rest}>
      {(clusterer) => (
        <>
          {Children.map(children, (child) => ({
            ...child,
            props: { ...child.props, clusterer },
          }))}
        </>
      )}
    </MarkerClusterer>
  );
};
