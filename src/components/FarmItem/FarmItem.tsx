import React, { useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Group, Rect } from "react-konva";
import useImage from "use-image";

import "./FarmItem.scss";

const FarmItem = ({ dimensions, item }: any) => {
    const [bg] = useImage(item.backgroundImage);
    const [building] = useImage(item.buildingImage);

    const dogRef = useRef<any>(null);

    return (
        <div className="farm-item">
            <Stage
                width={dimensions.width}
                height={100}
            >
                <Layer>
                    <Rect
                        x={0}
                        y={0}
                        width={dimensions.width}
                        height={100}
                        fillPatternImage={bg}
                        fillPatternRepeat="repeat"
                    />
                    <Group
                        width={dimensions.width}
                        height={100}
                        x={0}
                        y={0}
                    >
                        {Array.from({ length: item.boughtCount }).map((_, i) => {
                            return (
                                i <= 11 && (
                                    <KonvaImage
                                        key={i}
                                        image={building}
                                        width={dimensions.width / 10}
                                        height={dimensions.width / 10}
                                        ref={dogRef}
                                        y={30}
                                        x={i * 50}
                                    />
                                )
                            );
                        })}
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default FarmItem;
