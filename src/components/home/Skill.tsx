import { IconType } from "react-icons"
interface Props {
  fields: { name: string, Icon: IconType }[]
}

export function Skill(props: Props) {
  const skill = props.fields.map((field) => {
    const { name, Icon } = field;
    return (
      <div key={name} className="w-6/12 flex justify-center">
        <div className="flex font-bold w-32 mb-2">
          <Icon className="block my-auto mr-2 text-2xl" />
          <span className="text-lg">{name}</span>
        </div>
      </div>
    )

  })
  return (
    <div className="flex flex-wrap ">
      {skill}
    </div >
  )
}
