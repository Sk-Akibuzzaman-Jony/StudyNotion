import React from 'react'
import CTAButton from './Button'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position, heading, body, button1, button2, codeblock, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        <div className='flex flex-col w-[50%] gap-8'>
            <div className='text-white font-bold text-4xl font-inter'>
                {heading}
            </div>
            <div className='text-richblack-300 font-bold '>
                {body}
            </div>
            <div className='flex flex-row gap-7 mt-7'>
                <CTAButton active={button1.active} linkto={button1.linkto}>
                    {button1.text}
                </CTAButton>
                <CTAButton active={button2.active} linkto={button2.linkto}>
                    {button2.text}
                </CTAButton>
            </div>
        </div>
        {/* Section 2 */}
        <div className='flex flex-row text-10[px] w-[100%] lg:w-[500px]'>
            {/* HW BG-Gradient */}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2  font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                        }
                    }
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks