/* =========================================================
   UI — PUBLIC EXPORTS
   ========================================================= */

/* =========================
   PRIMITIVES (layout system)
========================= */

export { Surface } from './primitives/Surface'
export { Stack } from './primitives/Stack'
export { Inline } from './primitives/Inline'
export { Text } from './primitives/Text'

/* =========================
   COMPONENTS (visual system)
========================= */

export { Button } from './components/Button'
export { Badge } from './components/Badge'
export { Avatar } from './components/Avatar'
export { Icon } from './components/Icon'
export { Alert } from './components/Alert'
export { AlertTitle, AlertDescription } from './components/Alert'

export { Input, Textarea } from './components/Input'
export { Checkbox } from './components/Checkbox'
export { Radio } from './components/Radio'
export { Switch } from './components/Switch'

/* =========================
   PAGE SYSTEM (NEW 🔥)
========================= */

export { default as PageLayout } from './shell/content/PageLayout'
export { PageHeader } from './components/PageHeader'
export { PageActions } from './components/PageActions'
export { PageSection } from './components/PageSection'
export { EmptyState } from './components/EmptyState'
export { LoadingState } from './components/LoadingState'


/* =========================
   OVERLAYS (shadcn wrapped)
========================= */

export {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
 DialogTrigger,
 DialogClose,
} from './overlays/Dialog'
export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from './overlays/Tooltip'
export { toast } from './overlays/Toast'
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './overlays/Select'

/* =========================
   ⚠ TEMP (TO MIGRATE OUT)
========================= */

/**
 * These should be moved out of /ui later
 * (feature or shared layer)
 */

export { MultiSelect } from './overlays/MultiSelect'
export { AccordionSection } from './overlays/Accordion'
export { FormField } from './FormField'
export { Table } from './Table'