import { Dispatch, SetStateAction } from "react";
import { CustomOverlayMap, MarkerClusterer, ZoomControl } from "react-kakao-maps-sdk";
import { BeatLoader } from "react-spinners";
import { MabWeb, MabBox, MyMarker, MyMarkerBox } from "./main.body.styles";
import { IProps } from "./main.body.types";

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
            props.setLocation({
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
          <MarkerClusterer averageCenter={true} minLevel={4} minClusterSize={1}>
            <CustomOverlayMap
              position={{
                lat: props.position.coords.latitude ?? 37.484,
                lng: props.position.coords.longitude ?? 126.88,
              }}
            >
              <MyMarkerBox>
                <MyMarker src="/images/marker/ker4.png"></MyMarker>
              </MyMarkerBox>
            </CustomOverlayMap>
            {props.data?.map(
              (
                el: {
                  findAroundUsers: {
                    lat: number;
                    lng: number;
                    id: string;
                  };
                },

                dex: number
              ) => (
                <CustomOverlayMap
                  position={{
                    lat: el.findAroundUsers.lat,
                    lng: el.findAroundUsers.lng,
                  }}
                  key={el.findAroundUsers.id}
                >
                  <MyMarkerBox>
                    <MyMarker src="/images/marker/mar4.png"></MyMarker>
                  </MyMarkerBox>
                </CustomOverlayMap>
              )
            )}
          </MarkerClusterer>
        </MabWeb>
      )}
    </>
  );
}
