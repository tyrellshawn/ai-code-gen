// DynamicComponent.tsx

import React from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import * as Lucide from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const cleanCode = (code: string): string => {
    let cleanedCode = code
        // Remove code fences
        .replace(/```[a-z]*\n?/g, '')
        .replace(/```$/, '')
        // Remove import statements
        .replace(/import\s+.*?;?\n/g, '')
        // Remove export statements
        .replace(/export\s+default\s+/g, '')
        .trim();
    return cleanedCode;
};

const scope = {
    React,
    useState: React.useState,
    Lucide,
    Button,
    Input,
    Textarea,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Checkbox,
    RadioGroup,
    RadioGroupItem,
    Switch,
    Slider,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Alert,
    AlertDescription,
    AlertTitle,
    // Include any other components or hooks used
};

const DynamicComponent: React.FC<{ code: string }> = ({ code }) => {
    const cleanedCode = cleanCode(code);

    return (
        <LiveProvider code={cleanedCode} scope={scope}>
            <LivePreview />
            <LiveError />
        </LiveProvider>
    );
};

export default DynamicComponent;
