import * as lucide from 'lucide-react';

const iconsToCheck = [
  'Layers', 'Rocket', 'Code2', 'ShieldCheck', 'Users', 'TrendingUp',
  'Clock', 'BarChart', 'ArrowRight',
  'Search', 'Menu', 'X',
  'Code', 'CheckCircle', 'Award', 'BookOpen', 'Briefcase',
  'FileText', 'MonitorPlay', 'FolderOpen', 'Map', 'Trophy', 'GraduationCap', 'Video',
  'Play', 'Check', 'Server', 'GitPullRequest'
];

let hasError = false;
for (const icon of iconsToCheck) {
  if (!lucide[icon]) {
    console.error(`Invalid Lucide icon: ${icon}`);
    hasError = true;
  }
}
if (!hasError) {
  console.log('All icons are valid.');
}
