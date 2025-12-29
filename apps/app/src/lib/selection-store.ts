"use client"

import * as React from "react"
import { useSyncExternalStore } from "react"

type Listener = () => void
type SelectionState = { isSelecting: boolean; selected: Set<string> }
type SelectionSnapshot = { isSelecting: boolean; selectedIds: string[] }

const selections = new Map<string, SelectionState>()
const listeners = new Set<Listener>()
const snapshots = new Map<string, SelectionSnapshot>()

function selectingStorageKey(key: string): string {
  return `requests:isSelecting:${key}`
}

function selectedStorageKey(key: string): string {
  return `requests:selected:${key}`
}

function selectingCookieName(key: string): string {
  return `requests_isSelecting_${key}`
}

function selectedCookieName(key: string): string {
  return `requests_selected_${key}`
}

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null
  const source = document.cookie
  if (!source) return null
  const needle = `${name}=`
  const parts = source.split(";")
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]?.trim()
    if (!part || !part.startsWith(needle)) continue
    return part.substring(needle.length)
  }
  return null
}

function readSelectingInitial(key: string): boolean {
  try {
    const cookieValue = readCookieValue(selectingCookieName(key))
    if (cookieValue === "1" || cookieValue === "true") return true
    if (cookieValue === "0" || cookieValue === "false") return false
    if (typeof window !== "undefined") {
      const v = window.localStorage.getItem(selectingStorageKey(key))
      if (v === "1" || v === "true") {
        return true
      }
    }
  } catch {}
  return false
}

function readSelectedInitial(key: string): Set<string> {
  const selected = new Set<string>()
  try {
    const rawCookie = readCookieValue(selectedCookieName(key))
    const raw = rawCookie ?? (typeof window !== "undefined" ? window.localStorage.getItem(selectedStorageKey(key)) : null)
    if (!raw) return selected
    const decoded = rawCookie ? decodeURIComponent(raw) : raw
    const parsed = JSON.parse(decoded)
    if (!Array.isArray(parsed)) return selected
    for (let i = 0; i < parsed.length; i++) {
      const id = parsed[i]
      if (typeof id === "string" && id) {
        selected.add(id)
      }
    }
  } catch {}
  return selected
}

function writeSelected(key: string, selected: Set<string>) {
  try {
    const ids = Array.from(selected)
    const value = JSON.stringify(ids)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(selectedStorageKey(key), value)
    }
    if (typeof document !== "undefined") {
      const encoded = encodeURIComponent(value)
      const maxAge = 60 * 60 * 24 * 30
      document.cookie = `${selectedCookieName(key)}=${encoded}; path=/; max-age=${maxAge}`
    }
  } catch {}
}

function ensure(key: string): SelectionState {
  const s = selections.get(key)
  if (s) return s
  const initialSelecting = readSelectingInitial(key)
  const initialSelected = readSelectedInitial(key)
  const next: SelectionState = { isSelecting: initialSelecting, selected: initialSelected }
  selections.set(key, next)
  return next
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notify() {
  for (const l of listeners) l()
}

function arraysEq(a: string[], b: string[]) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

function computeSnapshot(key: string): SelectionSnapshot {
  const s = ensure(key)
  return { isSelecting: s.isSelecting, selectedIds: Array.from(s.selected) }
}

function getSnapshotCached(key: string): SelectionSnapshot {
  const current = snapshots.get(key)
  const next = computeSnapshot(key)
  if (!current || current.isSelecting !== next.isSelecting || !arraysEq(current.selectedIds, next.selectedIds)) {
    snapshots.set(key, next)
    return next
  }
  return current
}

export function setSelecting(key: string, selecting: boolean) {
  const s = ensure(key)
  s.isSelecting = selecting
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(selectingStorageKey(key), selecting ? "1" : "0")
    }
    if (typeof document !== "undefined") {
      const maxAge = 60 * 60 * 24 * 30
      const value = selecting ? "1" : "0"
      document.cookie = `${selectingCookieName(key)}=${value}; path=/; max-age=${maxAge}`
    }
  } catch {}
  notify()
}

export function toggleSelectionId(key: string, id: string, checked?: boolean) {
  const s = ensure(key)
  const isChecked = typeof checked === "boolean" ? checked : !s.selected.has(id)
  if (isChecked) s.selected.add(id)
  else s.selected.delete(id)
  writeSelected(key, s.selected)
  notify()
}

export function selectAllForKey(key: string, ids: string[]) {
  const s = ensure(key)
  ids.forEach((id) => s.selected.add(id))
   writeSelected(key, s.selected)
  notify()
}

export function clearSelection(key: string) {
  const s = ensure(key)
  s.selected.clear()
  writeSelected(key, s.selected)
  notify()
}

export function removeSelectedIds(key: string, ids: string[]) {
  const s = ensure(key)
  ids.forEach((id) => s.selected.delete(id))
  writeSelected(key, s.selected)
  notify()
}

export function getSelectedIds(key: string): string[] {
  return Array.from(ensure(key).selected)
}

export function useSelection(key: string): SelectionSnapshot {
  const get = React.useCallback(() => getSnapshotCached(key), [key])
  const getServer = React.useCallback(() => getSnapshotCached(key), [key])
  return useSyncExternalStore(subscribe, get, getServer)
}
