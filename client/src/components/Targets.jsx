import Section from "./Section";
import Heading from "./Heading";
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const Targets = () => {
  const [userIDCookies, setUserIDCookies] = useCookies(["userID"]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const targetsResponse = await axios.get(
          "http://localhost:4001/target/read",
          {
            params: { userID: userIDCookies.userID },
          }
        );
        const { userTargets } = targetsResponse.data;
        setGoals(userTargets.goals);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTargets();
  }, [goals]);

  return (
    <Section id="targets">
      <div className="container relative z-2 mt-10 lg:mt-5">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Set Targets, Crush Them, and Set More"
        />
        <div className="flex flex-wrap gap-10 mb-10">
          {goals?.map((goal, index) => (
            <div
              className="block relative p-0.5 
            bg-no-repeat bg-[length:100%_100%] 
            md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${benefits[index].backgroundUrl})`,
              }}
              key={benefits[index].id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{goal.title}</h5>
                <p className="body-2 mb-6 text-n-3">{goal.note}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={benefits[index].iconUrl}
                    width={48}
                    height={48}
                    alt={benefits[index].title}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </div>
              {benefits[index].light && <GradientLight />}
              <div
                className="absolute inset-0.5 bg-n-8"
                style={{
                  clipPath: "url(#benefits)",
                }}
              >
                <div
                  className="absolute inset-0 
                opacity-0 transition-opacity 
                hover:opacity-10"
                >
                  {benefits[index].imageUrl && (
                    <img
                      src={benefits[index].imageUrl}
                      width={380}
                      height={362}
                      alt={benefits[index].title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Targets;
