import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeUndefined = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.filter((item) => item !== undefined).map(removeUndefined);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, removeUndefined(v)])
    );
  }
  return obj;
};


type Change = {
  type: 'add' | 'delete' | 'modify';
  path: string[];
  oldValue?: any;
  newValue?: any;
};

export function formatPath(path: string[]): string {
  return path.map((segment, index) => {
    if (!isNaN(Number(segment))) {
      const prevSegment = path[index - 1];
      return prevSegment ? `${prevSegment} #${Number(segment) + 1}` : segment;
    }
    return segment.replace(/([A-Z])/g, ' $1').toLowerCase();
  }).join(' > ').replace(' > description', '');
}

export function compareObjects(oldObj: any, newObj: any, path: string[] = []): Change[] {
  const changes: Change[] = [];

  const compareValues = (oldVal: any, newVal: any, currentPath: string[]) => {
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      oldVal.forEach((item, index) => {
        compareValues(item, newVal[index], [...currentPath, index.toString()]);
      });
      newVal.slice(oldVal.length).forEach((item, index) => {
        changes.push({ type: 'add', path: [...currentPath, (oldVal.length + index).toString()], newValue: item });
      });
    } else if (typeof oldVal === 'object' && oldVal !== null && typeof newVal === 'object' && newVal !== null) {
      changes.push(...compareObjects(oldVal, newVal, currentPath));
    } else if (oldVal !== newVal) {
      changes.push({
        type: 'modify',
        path: currentPath,
        oldValue: oldVal,
        newValue: newVal,
      });
    }
  };

  // Check for deletions and modifications
  for (const key in oldObj) {
    const newPath = [...path, key];
    if (!(key in newObj)) {
      changes.push({ type: 'delete', path: newPath, oldValue: oldObj[key] });
    } else {
      compareValues(oldObj[key], newObj[key], newPath);
    }
  }

  // Check for additions
  for (const key in newObj) {
    const newPath = [...path, key];
    if (!(key in oldObj)) {
      changes.push({ type: 'add', path: newPath, newValue: newObj[key] });
    }
  }

  return changes;
}



