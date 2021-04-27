const SteeringWheel = ({ ...props }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m192 0c-105.863281 0-192 86.128906-192 192s86.136719 192 192 192 192-86.128906 192-192-86.136719-192-192-192zm0 352c-88.222656 0-160-71.777344-160-160s71.777344-160 160-160 160 71.777344 160 160-71.777344 160-160 160zm0 0"
      />
      <path
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m192 56c-50.726562 0-96.894531 27.929688-120.503906 72.894531-5.296875 10.113281-4.945313 21.96875.945312 31.699219 5.832032 9.644531 16.054688 15.40625 27.335938 15.40625h184.453125c11.28125 0 21.503906-5.761719 27.328125-15.398438 5.890625-9.738281 6.242187-21.585937.9375-31.707031-23.601563-44.964843-69.769532-72.894531-120.496094-72.894531zm92.222656 88-184.390625-.238281c18.054688-34.394531 53.367188-55.761719 92.167969-55.761719s74.113281 21.367188 92.3125 56zm0 0"
      />
      <path
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m128 208h-51.679688c-.152343 0-.296874.039062-.457031.046875-.574219.015625-1.152343.097656-1.734375.175781-.535156.074219-1.066406.144532-1.578125.273438-.167969.039062-.328125.039062-.496093.089844-.3125.085937-.574219.238281-.878907.34375-.558593.191406-1.105469.382812-1.632812.628906-.464844.21875-.886719.464844-1.328125.722656-.445313.261719-.886719.535156-1.3125.839844-.429688.3125-.832032.65625-1.222656 1.007812-.367188.335938-.726563.664063-1.070313 1.03125-.351563.382813-.679687.785156-.992187 1.199219-.3125.410156-.609376.816406-.875 1.25-.261719.429687-.496094.878906-.71875 1.328125-.230469.460938-.449219.933594-.640626 1.421875-.183593.488281-.328124.992187-.460937 1.496094-.128906.488281-.257813.96875-.347656 1.472656-.09375.566406-.132813 1.136719-.175781 1.710937-.015626.320313-.09375.632813-.09375.960938 0 .175781.046874.335938.046874.503906.015626.542969.089844 1.082032.167969 1.632813.074219.550781.152344 1.101562.28125 1.632812.039063.167969.039063.328125.078125.496094 12.664063 45.839844 49.007813 82.183594 94.839844 94.839844.128906.039062.257812.023437.394531.054687 1.214844.304688 2.480469.511719 3.789063.519532.035156 0 .058594.007812.089844.007812.023437 0 .046874-.015625.070312-.015625 1.578125-.007813 3.074219-.3125 4.511719-.742187.289062-.089844.5625-.160157.839843-.265626 1.417969-.511718 2.730469-1.199218 3.929688-2.070312.207031-.152344.382812-.320312.585938-.480469 1.160156-.929687 2.207031-1.984375 3.070312-3.191406.054688-.082031.128906-.144531.183594-.21875.894531-1.3125 1.535156-2.78125 2.015625-4.328125.046875-.160156.160156-.269531.199219-.4375.050781-.160156.042968-.320312.082031-.488281.128906-.539063.207031-1.089844.28125-1.648438.070312-.542969.140625-1.082031.160156-1.625.03125-.160156.078125-.320312.078125-.496093v-51.679688c0-26.472656-21.527344-48-48-48zm-28.039062 32h28.039062c8.824219 0 16 7.175781 16 16v28.039062c-18.800781-9.847656-34.183594-25.238281-44.039062-44.039062zm0 0"
      />
      <path
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m318.304688 212.121094c-.394532-.351563-.792969-.695313-1.226563-1.007813-.414063-.304687-.863281-.578125-1.308594-.839843-.433593-.257813-.867187-.503907-1.328125-.722657-.53125-.246093-1.074218-.4375-1.632812-.628906-.304688-.105469-.570313-.257813-.878906-.347656-.160157-.046875-.328126-.046875-.488282-.085938-.519531-.128906-1.058594-.199219-1.601562-.273437-.566406-.078125-1.136719-.152344-1.703125-.167969-.144531-.007813-.296875-.046875-.457031-.046875h-51.679688c-26.472656 0-48 21.527344-48 48v51.679688c0 .175781.046875.335937.046875.503906.015625.535156.089844 1.082031.160156 1.625.074219.558594.152344 1.113281.28125 1.648437.039063.160157.039063.320313.078125.488281.050782.160157.152344.277344.203125.4375.476563 1.554688 1.117188 3.023438 2.015625 4.328126.054688.082031.125.144531.183594.21875.863281 1.214843 1.910156 2.261718 3.070312 3.191406.199219.160156.375.328125.585938.480468 1.191406.871094 2.511719 1.550782 3.925781 2.070313.28125.105469.5625.175781.839844.265625 1.441406.429688 2.9375.734375 4.511719.742188.027344 0 .050781.015624.074218.015624.03125 0 .054688-.007812.085938-.007812 1.3125-.007812 2.570312-.214844 3.792969-.519531.128906-.03125.257812-.015625.390625-.054688 45.832031-12.65625 82.179687-49 94.84375-94.839843.046875-.167969.039062-.328126.078125-.496094.128906-.539063.207031-1.082032.28125-1.632813.070312-.542969.144531-1.089843.167969-1.632812.007812-.167969.046874-.328125.046874-.503907 0-.328124-.078124-.632812-.097656-.960937-.03125-.574219-.078125-1.144531-.175781-1.710937-.085937-.503907-.207031-.984376-.34375-1.472657-.136719-.503906-.277344-1.007812-.460937-1.496093-.1875-.488282-.410157-.960938-.640626-1.421876-.226562-.457031-.457031-.898437-.722656-1.328124-.269531-.433594-.566406-.839844-.871094-1.25-.3125-.414063-.640624-.816407-.992187-1.199219-.320313-.382813-.679687-.71875-1.054687-1.046875zm-78.304688 71.917968v-28.039062c0-8.824219 7.175781-16 16-16h28.039062c-9.855468 18.800781-25.238281 34.191406-44.039062 44.039062zm0 0"
      />
    </svg>
  )
}

export default SteeringWheel
