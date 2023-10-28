import React from 'react'

export default function Button(props) {
const {color,title,extra,onClick,disabled,...rest}=props;
  return (
    <button onClick={onClick} disabled={disabled} class={`${extra} my-2 inline-flex cursor-pointer items-center justify-center rounded-xl bg-purple-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-purple-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]`}
    href="#">
     {title}
</button>
  )
}
