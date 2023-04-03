import { CustomOverlayMap, MarkerClusterer, ZoomControl } from "react-kakao-maps-sdk";
import { BeatLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import FilterlingUI from "../../../commons/items/filterling/filterling.index";
import { isOpenState } from "../../../commons/stores";
import { MabWeb, MabBox, MyMarker, MyMarkerBox } from "./main.body.styles";
import { IProps } from "./main.body.types";

export default function MainBody(props: IProps): JSX.Element {
  const [isOpen] = useRecoilState(isOpenState);

  return (
    <>
      {props.position === null ? (
        <MabBox isOpen={isOpen}>
          <BeatLoader color="#6658ca" />
        </MabBox>
      ) : (
        <MabBox>
          <MabWeb
            isOpen={isOpen}
            center={{
              lat: props.position?.coords.latitude ?? 34.55635,
              lng: props.position?.coords.longitude ?? 127.795841,
            }}
            maxLevel={12}
            level={3}
            onZoomChanged={(map) => {
              props.setLevel(map.getLevel());
            }}
            onBoundsChanged={(map) => props.locationSaveFn(map)}
          >
            <FilterlingUI />
            <ZoomControl />
            <MarkerClusterer averageCenter={true} minLevel={4} minClusterSize={1}>
              <CustomOverlayMap
                position={{
                  lat: props.position.coords.latitude ?? 37.484,
                  lng: props.position.coords.longitude ?? 126.88,
                }}
              >
                <MyMarkerBox>
                  <MyMarker src="/images/marker/myMarker.png" style={{ zIndex: 5 }}></MyMarker>
                </MyMarkerBox>
              </CustomOverlayMap>
              {props?.data?.findAroundUsers.map((el) => (
                <CustomOverlayMap
                  position={{
                    lat: el.lat,
                    lng: el.lng,
                  }}
                  key={el.id}
                >
                  <MyMarkerBox>
                    <MyMarker src="/images/marker/userMarker.png" style={{ zIndex: 1 }}></MyMarker>
                  </MyMarkerBox>
                </CustomOverlayMap>
              ))}
            </MarkerClusterer>
          </MabWeb>
        </MabBox>
      )}
    </>
  );
}
