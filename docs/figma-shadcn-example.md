# Example: Figma to shadcn/ui Integration

This document shows a complete workflow of using the `figma-shadcn` agent to convert a Figma design into a production-ready shadcn/ui + Tailwind component.

## Scenario: User Profile Card

**User provides**: "Analyze this Figma component: https://figma.com/design/abc123xyz/UserDashboard?node-id=42-156"

### Phase 1: Design Analysis

**Agent Actions:**
1. Extracts `fileKey: abc123xyz` and `nodeId: 42:156` from URL
2. Fetches design context using `get_design_context`
3. Captures visual screenshot using `get_screenshot`
4. Analyzes the component structure

**Agent Findings:**
```
Component Analysis:
- Type: Card component
- Layout: Vertical flex layout
- Header: Avatar (48x48px) + Name + Role
- Body: Bio text (3 lines max)
- Footer: Action buttons (Edit, Message)

Styling:
- Background: white with subtle border
- Border radius: 12px
- Padding: 24px
- Shadow: soft elevation (0 2px 8px rgba(0,0,0,0.08))
- Gap between sections: 16px

Typography:
- Name: 18px, weight 600, gray-900
- Role: 14px, weight 400, gray-500
- Bio: 14px, weight 400, gray-600, line-height 1.5

Colors:
- Primary button: blue-600 (#2563eb)
- Secondary button: transparent with border
```

### Phase 2: shadcn/ui Discovery

**Agent Actions:**
1. Checks for `components.json` → Found (using @shadcn registry)
2. Searches registry with query: "card"
3. Reviews Card component structure
4. Searches for: "avatar", "button"

**Agent Findings:**
```
Matching Components:
✅ Card, CardHeader, CardContent, CardFooter (base structure)
✅ Avatar, AvatarImage, AvatarFallback (user photo)
✅ Button (action buttons)

Installation needed:
npx shadcn-ui@latest add card avatar button
```

### Phase 3: Implementation

**Agent generates:**

```typescript
/**
 * UserProfileCard
 * Based on Figma: User Dashboard / Profile Card (node-id: 42-156)
 *
 * Design notes:
 * - Uses shadcn/ui Card, Avatar, Button components
 * - Custom spacing: gap-4 (16px) matches Figma exactly
 * - Border radius: rounded-xl (12px) as specified in design
 * - Shadow: shadow-sm matches the soft elevation
 *
 * Deviations: None - 100% faithful to design
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { MessageSquare, Pencil } from "lucide-react"

interface UserProfileCardProps {
  user: {
    name: string
    role: string
    bio: string
    avatar: string
  }
  onEdit?: () => void
  onMessage?: () => void
}

export function UserProfileCard({ user, onEdit, onMessage }: UserProfileCardProps) {
  return (
    <Card className="w-[320px] rounded-xl shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {user.bio}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={onEdit}
          className="flex-1"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onMessage}
          className="flex-1"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
      </CardFooter>
    </Card>
  )
}
```

**Agent provides installation:**
```bash
# Install required shadcn/ui components
npx shadcn-ui@latest add card avatar button

# Install icon library (if not already present)
npm install lucide-react
```

**Agent provides usage example:**
```typescript
// Example usage in a page or component
import { UserProfileCard } from "@/components/user-profile-card"

export default function TeamPage() {
  const user = {
    name: "Alice Johnson",
    role: "Product Designer",
    bio: "Passionate about creating intuitive user experiences. 5+ years in design systems and component libraries.",
    avatar: "https://example.com/avatar.jpg"
  }

  return (
    <div className="p-8">
      <UserProfileCard
        user={user}
        onEdit={() => console.log("Edit clicked")}
        onMessage={() => console.log("Message clicked")}
      />
    </div>
  )
}
```

### Phase 4: Code Connect (Bonus)

**Agent asks:**
> "Would you like me to map this component back to Figma using Code Connect? This will link the Figma design node to your implementation file."

**User responds:** "Yes, please map it"

**Agent actions:**
```typescript
// Creates Code Connect mapping
add_code_connect_map({
  fileKey: "abc123xyz",
  nodeId: "42:156",
  source: "components/user-profile-card.tsx",
  componentName: "UserProfileCard",
  label: "React"
})
```

**Agent confirms:**
> ✅ Code Connect mapping created successfully. Your Figma component is now linked to `components/user-profile-card.tsx`. Designers can now see the implementation directly in Figma Dev Mode.

## Handling Ambiguous Components

**Scenario:** Figma component named "Frame 789" (unclear name)

**Agent asks:**
> "I found a component named 'Frame 789' in Figma. The visual shows a container with tabs at the top and content panels below. This could be implemented as:
>
> 1. shadcn/ui Tabs component
> 2. Custom navigation with conditional rendering
>
> Which approach would you prefer?"

**User clarifies:** "Use Tabs component"

**Agent proceeds** with Tabs-based implementation.

## Handling Missing Components

**Scenario:** Figma shows a complex stepper component (not in shadcn/ui by default)

**Agent explains:**
> "The Figma design shows a stepper/progress indicator component. shadcn/ui doesn't have a built-in Stepper component, but I can create a custom implementation using these base components:
>
> - Card (for structure)
> - Badge (for step numbers)
> - Separator (for connecting lines)
>
> The result will follow shadcn/ui patterns and be fully customizable. Shall I proceed?"

## Color Matching Strategy

**Scenario:** Figma uses `#3b82f6` (exact blue)

**Agent decides:**
```typescript
// Figma color: #3b82f6
// Closest Tailwind: blue-500 (#3b82f6) ✅ Exact match!

<Button className="bg-blue-500 hover:bg-blue-600">
  Action
</Button>
```

**Scenario:** Figma uses `#7c3aed` (custom purple, no exact Tailwind match)

**Agent asks:**
> "The Figma design uses a custom purple color (#7c3aed). Would you like me to:
>
> 1. Use the closest Tailwind color (violet-600: #7c3aed) - exact match
> 2. Define a custom CSS variable for exact brand color
>
> I recommend option 1 as it's an exact match."

## Responsive Behavior

**Scenario:** Figma shows only desktop view

**Agent notes:**
```typescript
/**
 * Responsive behavior (not specified in Figma):
 * - Mobile: w-full (stretches to container)
 * - Desktop: w-[320px] (fixed width as designed)
 */

<Card className="w-full md:w-[320px] rounded-xl shadow-sm">
  {/* ... */}
</Card>
```

**Agent explains:**
> "The Figma design shows a fixed 320px width. I've added responsive behavior where the card stretches to full width on mobile and uses the fixed width on desktop. Let me know if you'd prefer a different approach."

## Summary

The `figma-shadcn` agent:
- ✅ Analyzes Figma designs thoroughly (structure, styling, spacing)
- ✅ Maps to appropriate shadcn/ui components
- ✅ Generates production-ready, type-safe code
- ✅ Provides exact Tailwind styling matching the design
- ✅ Includes accessibility attributes (ARIA, alt text)
- ✅ Handles ambiguity through interactive questions
- ✅ Offers Code Connect mapping back to Figma
- ✅ Explains design decisions and deviations clearly

**Result:** Pixel-perfect implementation that follows shadcn/ui best practices and requires minimal adjustments.
