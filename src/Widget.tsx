import * as React from "react";

import { KBarProvider } from "./KBarContextProvider";
import { ActionImpl } from "./action";
import { KBarAnimator } from "./KBarAnimator";
import { KBarPortal } from "./KBarPortal";
import { KBarPositioner } from "./KBarPositioner";
import { KBarResults } from "./KBarResults";
import { KBarSearch } from "./KBarSearch";
import { ActionId } from "./types";
import { useKBar } from "./useKBar";
import useHypermodeSearch from "./useHypermodeSearch";

const searchStyle = {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box" as React.CSSProperties["boxSizing"],
  outline: "none",
  border: "none",
  background: "var(--background)",
  color: "var(--foreground)",
};

const animatorStyle = {
  maxWidth: "600px",
  width: "100%",
  background: "var(--background)",
  color: "var(--foreground)",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "var(--shadow)",
};

const groupNameStyle = {
  padding: "8px 16px",
  fontSize: "10px",
  textTransform: "uppercase" as const,
  opacity: 0.5,
};

const containerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d0d0d0',
    display: 'flex',
    alignItems: 'center',
  };

const inputStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333333',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
};

export default function Widget({apiKey, endpoint}:{apiKey: string, endpoint: string}) {
    return (
    <KBarProvider
      options={{
        enableHistory: false,
      }}
    >
      <CommandBar apiKey={apiKey} endpoint={endpoint} />
      <Input />
    </KBarProvider>
    )
}

function Input() {
    const {query} = useKBar();
    return (
    <div style={containerStyle}>
        <input 
            type="text" 
            style={inputStyle}
            placeholder="Search or ask..."
            onClick={query.toggle}
        />
        <span>⌘K</span>
      </div>
    )
}

function CommandBar({apiKey, endpoint}:{apiKey: string, endpoint: string}) {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} />
          <RenderResults apiKey={apiKey} endpoint={endpoint} />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults({apiKey, endpoint}:{apiKey: string, endpoint: string}) {
  const results = useHypermodeSearch(endpoint, apiKey);
    console.log(results)
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <ResultItem
            action={item}
            active={active}
          />
        )
      }
    />
  );
}

const ResultItem = (
    {
      action,
      active,
    }: {
      action: ActionImpl;
      active: boolean;
    },
  ) => {
    return (
      <div
        style={{
          padding: "12px 16px",
          background: active ? "var(--a1)" : "transparent",
          borderLeft: `2px solid ${
            active ? "var(--foreground)" : "transparent"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span style={{ fontSize: 12 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
