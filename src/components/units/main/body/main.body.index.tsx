import { Dispatch, SetStateAction } from "react";
import { CustomOverlayMap, MarkerClusterer, ZoomControl } from "react-kakao-maps-sdk";
import { BeatLoader } from "react-spinners";
import { CustomMarker, MabWeb, MabBox, CustomMyMarker } from "./main.body.styles";

interface IProps {
  state: { sw: string; ne: string } | undefined;
  position: {
    coords: {
      latitude: number;
      longitude: number;
    };
  };
  userLocation: {
    lat: string;
    lng: string;
  };
  data?: {
    findAroundUsers: string;
  };
  setLevel: React.Dispatch<React.SetStateAction<number | undefined>>;
  setState: Dispatch<
    SetStateAction<
      | {
          sw: string;
          ne: string;
        }
      | undefined
    >
  >;
}

export default function MainBody(props: IProps): JSX.Element {
  return (
    <>
      {props.position === null ? (
        <MabBox>
          <BeatLoader color="#6658ca" />
        </MabBox>
      ) : (
        <MabWeb
          center={{
            lat: props.position?.coords.latitude ?? 34.55635,
            lng: props.position?.coords.longitude ?? 127.795841,
          }}
          onBoundsChanged={(map) => {
            props.setState({
              sw: map.getBounds().getSouthWest().toString(),
              ne: map.getBounds().getNorthEast().toString(),
            });
          }}
          maxLevel={12}
          level={3}
          onZoomChanged={(map) => {
            props.setLevel(map.getLevel());
          }}
        >
          <ZoomControl />
          <MarkerClusterer averageCenter={true} minLevel={2}>
            <CustomOverlayMap
              position={{
                lat: props.position.coords.latitude ?? 37.484,
                lng: props.position.coords.longitude ?? 126.88,
              }}
            >
              <CustomMyMarker></CustomMyMarker>
            </CustomOverlayMap>
            {props.data?.findAroundUsers.map((el: { lat: number; lng: number; id: string }) => (
              <CustomOverlayMap
                position={{
                  lat: el.lat ?? props.userLocation.lat,
                  lng: el.lng ?? props.userLocation.lng,
                }}
                key={el.id}
              >
                <CustomMarker></CustomMarker>
              </CustomOverlayMap>
            ))}
          </MarkerClusterer>
        </MabWeb>
      )}
    </>
  );
}
