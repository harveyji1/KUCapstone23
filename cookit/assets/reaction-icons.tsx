/*
Purpose: This file is the Reaction Icons component
Author: Audrey Pino
Editors: 
*/

import * as React from "react";
import { View } from 'react-native'
import Svg, { 
  Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask 
} from 'react-native-svg'

const SavedReactionIcon = () => (
  <View>
    <Svg viewBox="0 0 24 24" width="24" height="24">
      <Path
        fill="#345C50" d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2ZM15.0103 9.75C14.0403 10.1 13.0203 10.28 12.0003 10.28C10.9803 10.28 9.96031 10.1 8.99031 9.75C8.60031 9.61 8.40031 9.18 8.54031 8.79C8.69031 8.4 9.12031 8.2 9.51031 8.34C11.1203 8.92 12.8903 8.92 14.5003 8.34C14.8903 8.2 15.3203 8.4 15.4603 8.79C15.6003 9.18 15.4003 9.61 15.0103 9.75Z"
      />
    </Svg>
  </View>
)

export {
    SavedReactionIcon
}

const SavedReactionOutlineIcon = () => (
    <View>
      <Svg viewBox="0 0 24 24" width="24" height="24">
        <Path
          fill="#718093" d="M10 8.56671C9.15 8.56671 8.3 8.41671 7.49167 8.12504C7.16667 8.00838 7 7.65004 7.11667 7.32504C7.24167 7.00004 7.6 6.83338 7.925 6.95004C9.26667 7.43338 10.7417 7.43338 12.0833 6.95004C12.4083 6.83338 12.7667 7.00004 12.8833 7.32504C13 7.65004 12.8333 8.00838 12.5083 8.12504C11.7 8.41671 10.85 8.56671 10 8.56671Z"
        />
        <Path
          fill="#718093" d="M15.8917 18.9583C15.4667 18.9583 15.0001 18.8333 14.5501 18.575L10.4834 16.3166C10.2417 16.1833 9.76672 16.1833 9.52506 16.3166L5.45839 18.575C4.63339 19.0333 3.79172 19.0833 3.15006 18.7C2.50839 18.325 2.14172 17.5666 2.14172 16.625V4.88329C2.14172 2.76663 3.86672 1.04163 5.98339 1.04163H14.0251C16.1417 1.04163 17.8667 2.76663 17.8667 4.88329V16.625C17.8667 17.5666 17.5001 18.325 16.8584 18.7C16.5667 18.875 16.2334 18.9583 15.8917 18.9583ZM10.0001 14.9666C10.3917 14.9666 10.7751 15.05 11.0834 15.225L15.1501 17.4833C15.5751 17.725 15.9667 17.775 16.2167 17.625C16.4667 17.475 16.6084 17.1166 16.6084 16.625V4.88329C16.6084 3.45829 15.4417 2.29163 14.0167 2.29163H5.98339C4.55839 2.29163 3.39172 3.45829 3.39172 4.88329V16.625C3.39172 17.1166 3.53339 17.4833 3.78339 17.625C4.03339 17.7666 4.41672 17.725 4.85006 17.4833L8.91672 15.225C9.22506 15.05 9.60839 14.9666 10.0001 14.9666Z"
        />
        <Path
          fill="#718093" d="M15.8917 18.9583C15.4667 18.9583 15.0001 18.8333 14.5501 18.575L10.4834 16.3166C10.2417 16.1833 9.76672 16.1833 9.52506 16.3166L5.45839 18.575C4.63339 19.0333 3.79172 19.0833 3.15006 18.7C2.50839 18.325 2.14172 17.5666 2.14172 16.625V4.88329C2.14172 2.76663 3.86672 1.04163 5.98339 1.04163H14.0251C16.1417 1.04163 17.8667 2.76663 17.8667 4.88329V16.625C17.8667 17.5666 17.5001 18.325 16.8584 18.7C16.5667 18.875 16.2334 18.9583 15.8917 18.9583ZM10.0001 14.9666C10.3917 14.9666 10.7751 15.05 11.0834 15.225L15.1501 17.4833C15.5751 17.725 15.9667 17.775 16.2167 17.625C16.4667 17.475 16.6084 17.1166 16.6084 16.625V4.88329C16.6084 3.45829 15.4417 2.29163 14.0167 2.29163H5.98339C4.55839 2.29163 3.39172 3.45829 3.39172 4.88329V16.625C3.39172 17.1166 3.53339 17.4833 3.78339 17.625C4.03339 17.7666 4.41672 17.725 4.85006 17.4833L8.91672 15.225C9.22506 15.05 9.60839 14.9666 10.0001 14.9666Z"
        />
      </Svg>
    </View>
  )
  
  export {
    SavedReactionOutlineIcon
  }

  const UpReactionIcon = () => (
    <View>
      <Svg viewBox="0 0 24 24" width="24" height="24">
        <Path
          fill="#FFF" d="M2.08337 10L10 2.5L17.9167 10H12.9167V17.5H7.08337V10H2.08337Z" stroke="#345C50" stroke-linecap="round" stroke-linejoin="round"
        />
      </Svg>
    </View>
  )
  
  export {
      UpReactionIcon
  }
  
  const UpReactionOutlineIcon = () => (
      <View>
        <Svg viewBox="0 0 24 24" width="24" height="24">
          <Path
            fill="#FFF" d="M2.08337 10L10 2.5L17.9167 10H12.9167V17.5H7.08337V10H2.08337Z" stroke="#718093" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
          />
        </Svg>
      </View>
    )
    
    export {
      UpReactionOutlineIcon
    }


    const DownReactionIcon = () => (
        <View>
          <Svg viewBox="0 0 24 24" width="24" height="24">
            <Path
              fill="#345C50" d="M2.08337 10L10 17.5L17.9167 10H12.9167V2.5H7.08337V10H2.08337Z" stroke="#1F2937" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
            />
          </Svg>
        </View>
      )
      
      export {
          DownReactionIcon
      }
      
    const DownReactionOutlineIcon = () => (
        <View>
        <Svg viewBox="0 0 24 24" width="24" height="24">
            <Path
            fill="#FFF" d="M2.08337 10L10 17.5L17.9167 10H12.9167V2.5H7.08337V10H2.08337Z" stroke="#718093" stroke-linecap="round" stroke-linejoin="round"
            />
        </Svg>
        </View>
    )
    
    export {
        DownReactionOutlineIcon
    }


    const CommentReactionIcon = () => (
        <View>
          <Svg viewBox="0 0 24 24" width="24" height="24">
            <Path
              fill="#FFF" d="M16.5 11.5C16.5 11.942 16.3244 12.366 16.0118 12.6785C15.6993 12.9911 15.2754 13.1667 14.8333 13.1667H4.83333L1.5 16.5V3.16667C1.5 2.72464 1.67559 2.30072 1.98816 1.98816C2.30072 1.67559 2.72464 1.5 3.16667 1.5H14.8333C15.2754 1.5 15.6993 1.67559 16.0118 1.98816C16.3244 2.30072 16.5 2.72464 16.5 3.16667V11.5Z" stroke="#718093" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
            />
          </Svg>
        </View>
      )
      
      export {
        CommentReactionIcon
      }
      