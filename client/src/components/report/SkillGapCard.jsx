import Badge from '../common/Badge';
import { SEVERITY_STYLES } from '../../constants';
import { capitalize } from '../../utils/format';

const SkillGapCard = ({ skill, severity }) => {
  const style = SEVERITY_STYLES[severity] || SEVERITY_STYLES.medium;

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium text-slate-900">{skill}</p>
      <Badge className={style.badge}>({capitalize(severity)})</Badge>
    </div>
  );
};

export default SkillGapCard;
