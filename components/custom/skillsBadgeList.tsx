import { Badge } from '@/components/ui/badge'
import { getSkillColor, Skill } from '@/functions/getSkillColor'

interface SkillsBadgeListProps {
   skills?: Skill[];
}

export default function SkillsBadgeList({ skills }: SkillsBadgeListProps) {
   if (!skills || skills.length === 0) {
      return null
   }

   return (
      <div className="flex flex-wrap mt-2 p-4">
         {skills.map((skill: Skill, index: number) => (
            <div className="p-1" key={index}>
               <Badge variant="outline" className="p-1 px-2 text-center" style={{ color: getSkillColor(skill) }}>
                  {skill}
               </Badge>
            </div>
         ))}
      </div>
   )
}