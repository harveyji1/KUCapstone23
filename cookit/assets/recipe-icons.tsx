/*
Purpose: This file is the Recipe Icons component
Author: Audrey Pino
Editors: 
*/

import * as React from "react";
import { View } from 'react-native'
import Svg, { 
  Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask 
} from 'react-native-svg'

const TagChefIcon = () => (
  <View>
      <Svg viewBox="0 0 21 21" width="20" height="20">
      <Path
        fill="#111827" d="M10 18.9583C9.41667 18.9583 8.825 18.7333 8.38333 18.2917L6.95831 16.8833C6.60831 16.5333 6.12501 16.3417 5.63334 16.3417H5C3.275 16.3417 1.875 14.95 1.875 13.2417V4.14999C1.875 2.44165 3.275 1.05001 5 1.05001H15C16.725 1.05001 18.125 2.44165 18.125 4.14999V13.2417C18.125 14.95 16.725 16.3417 15 16.3417H14.3667C13.875 16.3417 13.3917 16.5417 13.0417 16.8833L11.6167 18.2917C11.175 18.7333 10.5833 18.9583 10 18.9583ZM5 2.29167C3.96667 2.29167 3.125 3.12498 3.125 4.14164V13.2333C3.125 14.2583 3.96667 15.0833 5 15.0833H5.63334C6.45834 15.0833 7.25831 15.4167 7.84164 15.9917L9.26666 17.4C9.675 17.8 10.3333 17.8 10.7417 17.4L12.1666 15.9917C12.75 15.4167 13.55 15.0833 14.375 15.0833H15C16.0333 15.0833 16.875 14.25 16.875 13.2333V4.14164C16.875 3.11664 16.0333 2.29167 15 2.29167H5Z"
      />
      <Path
        fill="#111827" d="M10 8.95838C8.58336 8.95838 7.43335 7.80837 7.43335 6.3917C7.43335 4.97504 8.58336 3.82507 10 3.82507C11.4167 3.82507 12.5667 4.97504 12.5667 6.3917C12.5667 7.80837 11.4167 8.95838 10 8.95838ZM10 5.07507C9.27503 5.07507 8.68335 5.6667 8.68335 6.3917C8.68335 7.1167 9.27503 7.70838 10 7.70838C10.725 7.70838 11.3167 7.1167 11.3167 6.3917C11.3167 5.6667 10.725 5.07507 10 5.07507Z"
      />
      <Path
        fill="#111827" d="M13.3334 13.6751C12.9917 13.6751 12.7084 13.3917 12.7084 13.0501C12.7084 11.9001 11.4917 10.9585 10.0001 10.9585C8.50841 10.9585 7.29175 11.9001 7.29175 13.0501C7.29175 13.3917 7.00841 13.6751 6.66675 13.6751C6.32508 13.6751 6.04175 13.3917 6.04175 13.0501C6.04175 11.2084 7.81675 9.70845 10.0001 9.70845C12.1834 9.70845 13.9584 11.2084 13.9584 13.0501C13.9584 13.3917 13.6751 13.6751 13.3334 13.6751Z"
      />
    </Svg>
  </View>
)

export {
    TagChefIcon
}

const PrepTimeIcon = () => (
    <View>
      <Svg viewBox="0 0 21 21" width="20" height="20">
        <Path
          fill="#111827" d="M9.99992 19.9152C5.63325 19.9152 2.08325 16.3652 2.08325 11.9986C2.08325 7.63189 5.63325 4.08189 9.99992 4.08189C14.3666 4.08189 17.9166 7.63189 17.9166 11.9986C17.9166 16.3652 14.3666 19.9152 9.99992 19.9152ZM9.99992 5.33189C6.32492 5.33189 3.33325 8.32356 3.33325 11.9986C3.33325 15.6736 6.32492 18.6652 9.99992 18.6652C13.6749 18.6652 16.6666 15.6736 16.6666 11.9986C16.6666 8.32356 13.6749 5.33189 9.99992 5.33189Z"
        />
        <Path
          fill="#111827" d="M10 12.4152C9.65833 12.4152 9.375 12.1319 9.375 11.7902V7.62357C9.375 7.2819 9.65833 6.99857 10 6.99857C10.3417 6.99857 10.625 7.2819 10.625 7.62357V11.7902C10.625 12.1319 10.3417 12.4152 10 12.4152Z"
        />
        <Path
          fill="#111827" d="M12.5 3.24857H7.5C7.15833 3.24857 6.875 2.96523 6.875 2.62357C6.875 2.2819 7.15833 1.99857 7.5 1.99857H12.5C12.8417 1.99857 13.125 2.2819 13.125 2.62357C13.125 2.96523 12.8417 3.24857 12.5 3.24857Z"
        />
      </Svg>
    </View>
  )
  
  export {
      PrepTimeIcon
  }

  const CookTimeIcon = () => (
    <View>
      <Svg viewBox="0 0 21 21" width="20" height="20">
        <Path
          fill="#111827" d="M10.0001 19.829C5.05842 19.829 1.04175 15.8123 1.04175 10.8707C1.04175 5.92899 5.05842 1.91232 10.0001 1.91232C14.9417 1.91232 18.9584 5.92899 18.9584 10.8707C18.9584 15.8123 14.9417 19.829 10.0001 19.829ZM10.0001 3.16232C5.75008 3.16232 2.29175 6.62066 2.29175 10.8707C2.29175 15.1207 5.75008 18.579 10.0001 18.579C14.2501 18.579 17.7084 15.1207 17.7084 10.8707C17.7084 6.62066 14.2501 3.16232 10.0001 3.16232Z"
        />
        <Path
          fill="#111827" d="M13.0916 14.1456C12.9833 14.1456 12.875 14.1206 12.775 14.054L10.1916 12.5123C9.54995 12.129 9.07495 11.2873 9.07495 10.5456V7.12898C9.07495 6.78732 9.35828 6.50398 9.69995 6.50398C10.0416 6.50398 10.325 6.78732 10.325 7.12898V10.5456C10.325 10.8456 10.575 11.2873 10.8333 11.4373L13.4166 12.979C13.7166 13.154 13.8083 13.5373 13.6333 13.8373C13.5083 14.0373 13.3 14.1456 13.0916 14.1456Z"
        />
      </Svg>
    </View>
  )
  
  export {
      CookTimeIcon
  }

  const CostIcon = () => (
    <View>
      <Svg viewBox="0 0 21 21" width="20" height="20">
      <Path
          fill="#111827" d="M11.1666 15.3442H9.07489C7.70822 15.3442 6.59989 14.1942 6.59989 12.7775C6.59989 12.4359 6.88322 12.1525 7.22489 12.1525C7.56655 12.1525 7.84989 12.4359 7.84989 12.7775C7.84989 13.5025 8.39989 14.0942 9.07489 14.0942H11.1666C11.7082 14.0942 12.1582 13.6109 12.1582 13.0275C12.1582 12.3025 11.8999 12.1609 11.4749 12.0109L8.11655 10.8275C7.46655 10.6025 6.59155 10.1192 6.59155 8.62752C6.59155 7.34419 7.59989 6.31085 8.83322 6.31085H10.9249C12.2916 6.31085 13.3999 7.46085 13.3999 8.87752C13.3999 9.21919 13.1166 9.50252 12.7749 9.50252C12.4332 9.50252 12.1499 9.21919 12.1499 8.87752C12.1499 8.15252 11.5999 7.56085 10.9249 7.56085H8.83322C8.29155 7.56085 7.84155 8.04419 7.84155 8.62752C7.84155 9.35252 8.09989 9.49418 8.52489 9.64419L11.8832 10.8275C12.5332 11.0525 13.4082 11.5359 13.4082 13.0275C13.3999 14.3025 12.3999 15.3442 11.1666 15.3442Z"
        />
        <Path
          fill="#111827" d="M10 16.4525C9.65833 16.4525 9.375 16.1692 9.375 15.8275V5.82751C9.375 5.48585 9.65833 5.20251 10 5.20251C10.3417 5.20251 10.625 5.48585 10.625 5.82751V15.8275C10.625 16.1692 10.3417 16.4525 10 16.4525Z"
        />
        <Path
          fill="#111827" d="M10.0001 19.7858C5.05841 19.7858 1.04175 15.7692 1.04175 10.8275C1.04175 5.88584 5.05841 1.86917 10.0001 1.86917C14.9417 1.86917 18.9584 5.88584 18.9584 10.8275C18.9584 15.7692 14.9417 19.7858 10.0001 19.7858ZM10.0001 3.11917C5.75008 3.11917 2.29175 6.5775 2.29175 10.8275C2.29175 15.0775 5.75008 18.5358 10.0001 18.5358C14.2501 18.5358 17.7084 15.0775 17.7084 10.8275C17.7084 6.5775 14.2501 3.11917 10.0001 3.11917Z"
        />
      </Svg>
    </View>
  )
  
  export {
      CostIcon
  }