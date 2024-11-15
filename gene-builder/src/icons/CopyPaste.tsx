import { CSSProperties } from 'react';

interface PropsType {
  style?: CSSProperties
  color?: string
}

const CopyPaste = (props: PropsType) => {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={props.style ? props.style : undefined}
    >
      <g mask='url(#mask0_1235_3833)'>
        <path
          d='M5 3H3v2h2V3zm14 4h2v6h-2V9H9v10h4v2H7V7h12zM7 3h2v2H7V3zM5 7H3v2h2V7zm-2 4h2v2H3v-2zm2 4H3v2h2v-2zm6-12h2v2h-2V3zm6 0h-2v2h2V3zm-2 14v-2h6v2h-2v2h-2v2h-2v-4zm4 2v2h2v-2h-2z" fill="#000000'
          fill={props.color ? props.color : '#AFAEB3'}
        />
      </g>
    </svg>
  );
};
export default CopyPaste;

