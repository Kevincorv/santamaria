import fs from 'node:fs';
const t = fs.readFileSync('node_modules/lucide-react/dist/lucide-react.d.ts', 'utf8');
const want = ['Landmark','Church','Columns3','TreePine','Bed','Utensils','Scissors','Compass','Search','MapPin','ArrowRight','Download','X','Check','CalendarDays','Share2','Route','Trophy','ShoppingBag','Store','QrCode','Menu','Heart','Info','Clock','Tag','Phone','Globe','Navigation','Star','ChevronDown','ChevronRight','ImageOff','Lightbulb','Camera','ExternalLink','BookOpen','Smartphone','Ticket','Sparkles','Mountain','Trees','Building2','Users','Wallet','ShieldCheck','CircleCheck','TriangleAlert','LoaderCircle','Languages','Mail','Instagram','Facebook','Sunrise','Sunset','Leaf','Flame','Home','Pizza','Coffee','Cake','Wine','Car','Bus','Wifi','Baby','Dog','Footprints','Tent','Backpack','MapPinned','CircleAlert','ArrowLeft','ArrowUpRight','ChevronLeft','Minus','Plus','Filter','Grid3x3','List','Share','Bookmark','Award','Handshake','Recycle','Droplets','Waves','Fish','Bird','Sun','Moon','CloudSun','Umbrella','Thermometer','Timer','Calendar','Clock3','MapPinCheck','BadgeCheck','StarHalf','MessageCircle','Send','Link','Printer','QrCode','ScanLine','Scan','Eye','Pencil','Trash2','PlusCircle','RefreshCw','LogIn','LogOut','User','Settings','LayoutDashboard','Table','Image','FileText','Folder','Inbox','Bell','Lock','Key','Database','Server','Cloud','HardDrive','Download','Upload','Maximize','Minimize','Move','ZoomIn','ZoomOut','Locate','LocateFixed','Crosshair','Target','Flag','FlagTriangle','Milestone','Signpost','TrafficCone','TrainFront','Bike','Truck','Fuel','UtensilsCrossed','Soup','Salad','Apple','Cherry','Grape','Citrus','Banana','IceCreamCone','Candy','Cookie'];
const seen = new Set();
const missing = [];
for (const w of want) {
  if (seen.has(w)) continue;
  seen.add(w);
  const re = new RegExp('(?:declare const|const) ' + w + ':');
  const re2 = new RegExp('\\b' + w + '\\b\\s*:\\s*LucideIcon');
  if (!re.test(t) && !re2.test(t) && !new RegExp('\\b' + w + '\\b').test(t)) missing.push(w);
}
console.log('TOTAL checked:', seen.size);
console.log('MISSING (' + missing.length + '):', missing.join(', '));
