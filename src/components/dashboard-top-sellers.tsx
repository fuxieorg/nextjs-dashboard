import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const DATA = [
  {
    id: 1,
    title: "Hogwarts Legacy",
    cover:
      "https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacy_AvalancheSoftware_S2_1200x1600-2bb94423bf1c7e2fca10577d9f2878b9?h=480&quality=medium&resize=1&w=360",
    type: "edition",
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt – Complete Edition",
    cover:
      "https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S2_1200x1600-53a8fb2c0201cd8aea410f2a049aba3f?h=480&quality=medium&resize=1&w=360",
    type: "base game",
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    cover:
      "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S2_03_1200x1600-b1847981214ac013383111fc457eb9c5?h=480&quality=medium&resize=1&w=360",
    type: "base game",
  },
  {
    id: 4,
    title: "Sid Meier’s Civilization® VI",
    cover:
      "https://cdn1.epicgames.com/cd14dcaa4f3443f19f7169a980559c62/offer/EGS_SidMeiersCivilizationVI_FiraxisGames_S2-860x1148-bffad83909595b7c5c60489a17056a59.jpg?h=480&quality=medium&resize=1&w=360",
    type: "base game",
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    cover:
      "https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=480&quality=medium&resize=1&w=360",
    type: "base game",
  },
];

const DashboardTopSellers: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Sellers</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-4">
          {DATA.map(({ id, title, cover, type }) => (
            <li key={id} className="flex items-center justify-between gap-4">
              <div className="flex w-full items-center gap-4">
                <Image
                  src={cover}
                  alt={title}
                  width={360}
                  height={480}
                  className="h-24 w-auto rounded"
                />
                <div className="w-full flex-1">
                  <div>
                    <Badge variant="secondary" className="uppercase">
                      {type}
                    </Badge>
                  </div>
                  <div className="mt-2 line-clamp-1 w-full">{title}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DashboardTopSellers;
