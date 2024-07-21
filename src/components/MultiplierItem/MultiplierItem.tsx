import React from "react";
import { Stage, Layer, Image as KonvaImage, Group } from "react-konva";
import useImage from "use-image";

import "./MultiplierItem.scss";
import IMAGES from "../../utils/images";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useCookies } from "../../App";
// import numeral from "numeral";

const MultiplierItem = ({ dimensions, item, index }: any) => {
    const {
        cookiesCount,
        setCookiesCount,
        cookiesPerSecond,
        setCookiesPerSecond,
        upgrades,
        updateMultipliers,
        updateUpgrades,
    } = useCookies();

    const [containerFrame] = useImage(IMAGES.multiplierFrame);
    const [avatar] = useImage(item.image);

    // const formatNumber = (number: number) => {
    //     let formatted = numeral(number).format("0.00a");

    //     formatted = formatted.replace(/\.00([a-z])$/, "$1");

    //     if (number < 1000) {
    //         formatted = numeral(number).format("0");
    //     }

    //     return formatted;
    // };

    const textColor = cookiesCount >= item.price ? "#6f6" : "#f66";

    const upgradeAvailable = cookiesCount >= item.price;

    const buyAMultiplier = () => {
        if (!upgradeAvailable) return;

        setCookiesCount((prev: number) => prev - item.price);
        const foundUpgrade = upgrades.find((upgrade: any) => upgrade.category === item.category);
        const newCookiesPerSecond = cookiesPerSecond - foundUpgrade.boughtCount * foundUpgrade.value;
        setCookiesPerSecond(newCookiesPerSecond + foundUpgrade.value * item.value * foundUpgrade.boughtCount);

        updateUpgrades(foundUpgrade.label, {
            description: `Each ${foundUpgrade.label} generates ${
                foundUpgrade.value * item.value
            } cookies in 10 seconds`,
            multiplier: foundUpgrade.multiplier * item.value,
            value: foundUpgrade.value * item.value,
        });

        updateMultipliers(item.label, {
            value: item.value,
            bought: true,
        });
    };

    return (
        <div
            className="multiplier-item"
            data-tooltip-id={`multiplier-item${index}`}
            onClick={buyAMultiplier}
        >
            {/* <div className={upgradeAvailable ? "display-none" : "disabled-upgrade"}></div> */}

            <Tooltip
                id={`multiplier-item${index}`}
                content={"Price: " + item.price + ", " + item.description}
                style={{ color: textColor }}
            />
            <Stage
                width={dimensions.width / 5.1}
                height={dimensions.width / 5.1}
            >
                <Layer>
                    <Group
                        x={0}
                        y={0}
                    >
                        <KonvaImage
                            image={containerFrame}
                            width={dimensions.width / 2.5}
                            height={dimensions.width / 5.1}
                            x={0}
                            y={0}
                        />
                        <KonvaImage
                            image={avatar}
                            width={dimensions.width / 5.1}
                            height={dimensions.width / 5.1}
                            x={0}
                            y={0}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default MultiplierItem;
