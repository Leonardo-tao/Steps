export type ButtonType = 'primary' | 'danger' | 'warning' | 'success' | 'info'


export interface FieldItem {
    label: string
    field: string
    type: 'input' | 'number' | 'select' | 'date' | 'datetime'
    options?: Array<{ label: string; value: string }>
}

export interface ConditionItem {
    field: string
    operator: string
    modifiable: boolean
    value: any
    type: string
}

export interface OperatorItem {
    label: string
    value: string
}