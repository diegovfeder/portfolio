// import { Component } from 'solid-js';

import { JSXElement } from "solid-js";

interface SkillProps {
  icon: JSXElement;
  title: string;
  description: string;
}

const Skill = ({ icon, title, description }: SkillProps) => {
  return (
    <div class="flex flex-col items-center justify-between p-4 pb-6 rounded-lg shadow-md">
      <div class="text-4xl p-3">{icon}</div>
      <h4 class="text-lg text-center font-bold pb-2">{title}</h4>
      <p class="text-sm text-pretty indent-4">
        {description}
      </p>
    </div>
  );
};

export default Skill;
