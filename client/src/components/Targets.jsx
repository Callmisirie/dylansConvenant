import Section from "./Section";
import Heading from "./Heading";
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { addButton, deleteButton } from "../assets";
import Input from "./Input";
import TextArea from "./TextArea";

const Targets = () => {
  const [userIDCookies, setUserIDCookies] = useCookies(["userID"]);
  const [goals, setGoals] = useState([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalNote, setGoalNote] = useState("");

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  function handleAddGoal() {
    if (goalTitle.length === 0) return;
    const newGoal = { goalTitle, goalNote };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoalTitle("");
    setGoalNote("");
  }

  function handleDeleteGoal(index) {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  }

  return (
    <Section id="targets">
      <div className="container relative z-2 mt-10 lg:mt-5">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Set Targets, Crush Them, and Set More"
        />
        <div className="flex flex-wrap gap-10 mb-10">
          {goals.length > 0 &&
            goals.map((goal, index) => (
              <div
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
                style={{
                  backgroundImage: `url(${
                    benefits[index % benefits.length].backgroundUrl
                  })`,
                }}
                key={index}
              >
                <button
                  onClick={() => {
                    handleDeleteGoal(index);
                  }}
                  className="cursor-pointer absolute top-[12%] left-[70%] z-10"
                >
                  <img
                    width={48}
                    height={48}
                    src={deleteButton}
                    alt="Delete Button"
                    className="cursor-pointer"
                  />
                </button>
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  <div className="flex justify-between items-center">
                    <h5 className="h5 my-2 font-code max-w-[12rem] whitespace-normal break-words">
                      {goal.goalTitle}
                    </h5>
                  </div>

                  <div className="flex items-start py-5 border-t border-n-6 mt-5 w-[16rem]" />
                  <p className="body-2 mb-6 text-n-3 font-code max-w-[16rem] whitespace-normal break-words">
                    {goal.goalNote}
                  </p>

                  <div className="flex items-start py-5 border-t border-n-6" />
                  <div className="flex items-center mt-auto">
                    <img
                      src={benefits[index % benefits.length].iconUrl}
                      width={48}
                      height={48}
                      alt={benefits[index % benefits.length].title}
                    />
                  </div>
                </div>
                {benefits[index % benefits.length].light && <GradientLight />}
                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{
                    clipPath: "url(#benefits)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                    {benefits[index % benefits.length].imageUrl && (
                      <img
                        src={benefits[index % benefits.length].imageUrl}
                        width={380}
                        height={362}
                        alt={benefits[index % benefits.length].title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <ClipPath />
              </div>
            ))}

          {goals.length < 6 ? (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${benefits[2].backgroundUrl})`,
              }}
            >
              <div className="relative z-2 flex flex-col justify-center items-center min-h-[22rem] p-[2.4rem]">
                <Input
                  handleChange={setGoalTitle}
                  value={goalTitle}
                  name="goalTitle "
                  placeholder="Title"
                  type="text"
                />
                <TextArea
                  setValue={setGoalNote}
                  value={goalNote}
                  name="goalNote "
                  placeholder="Note"
                  type="text"
                />
                <button
                  className={`${
                    goals.length < 6 ? "cursor-pointer" : " cursor-not-allowed"
                  }`}
                  disabled={goals.length >= 6}
                  onClick={handleAddGoal}
                >
                  <img
                    src={addButton}
                    alt="Add Button"
                    width={96}
                    height={96}
                  />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default Targets;
