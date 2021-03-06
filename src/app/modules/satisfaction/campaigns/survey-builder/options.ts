export const options = {
    builder: {
        basic: false,
        data: false,
        premium: false,
        customBasic: {
            title: 'Basic Components',
            default: true,
            weight: 0,
            components: {
                survey: true,
                textfield: true,
                textarea: true,
                email: true,
                phoneNumber: true,
                select: true,
                radio: true

            }
        },
        advanced: {
            components: {
                address: true,
                signature: true,
                datetime: true,
                day: true,
                url: false,
                tags: false,
                currency: false,
            }
        },
        layout: {
            ignore: false,
            title: 'Layout Components',
            weight: 0,
            components: {
                panel: false,
                table: false,
                tabs: false,
                well: false,
                columns: true,
                fieldset: false,
                content: false,
                htmlelement: true
            },
        }
    },
    language: 'en',
    i18n: {
        fr: {
            Label: 'ラベル',
            'Label Position': 'ラベルの位置',
            Placeholder: 'プレースホルダー',
            Description: '説明文',
            Tooltip: 'ツールチップ',
            Prefix: '接頭辞',
            Suffix: 'サフィックス',
            Widget: 'ウィジェット',
            'Input Mask': '定型入力',
            'Custom CSS Class': 'カスタムCSSクラス',
            'Tab Index': 'タブインデックス',
            'Hidden ': '隠された',
            'Hide Label': 'ラベルを非表示',
            'Show Word Counter': 'ワードカウンターを表示',
            'Show Character Counter': 'キャラクターカウンターを表示',
            'Hide Input': '入力を非表示',
            Excellent: 'Excelente',
            'Initial Focus': '最初の焦点',
            'Allow Spellcheck': 'スペルチェックを許可',
            Disabled: '無効',
            'Table View': 'テーブルビュー',
            'Modal Edit': 'モーダル編集',
            'Multiple Values': '複数の値',
            Persistent: '持続的',
            'Input Format': '入力フォーマット',
            Protected: '保護された',
            'Database Index': 'データベースインデックス',
            'Mixed (Allow upper and lower case)': '混合（大文字と小文字を許可）',
            Uppercase: '大文字',
            Lowercase: '小文字',
            'Encrypted (Enterprise Only)': '暗号化（エンタープライズのみ）',
            'Default Value': 'デフォルト値',
            'Drag and Drop a form component': 'フォームコンポーネントをドラッグアンドドロップする',
            'Text Field': 'テキストフィールド',
            Email: '電子メイル',
            'Text Area': 'テキスト領域',
            Panel: 'パネル',
            Time: '時間',
            Submit: '参加する',
            'Basic Components': '基本的なコンポーネント',
            'Layout Components': 'レイアウトコンポーネント',
            Advanced: '高度な',
            Hidden: '隠された',
            Component: '成分',
            Display: '表示',
            Data: 'データ',
            Validation: '検証',
            API: 'アプリケーションプログラミングインターフェース',
            Conditional: '条件付き',
            Logic: '論理',
            Layout: 'レイアウト',
            'Allow Multiple Masks': '複数のマスクを許可',
            'Input Field': '入力フィールド',
            Top: '上',
            'Input Type': '入力方式',
            Collapsible: '折りたたみ',
            Preview: 'プレビュー',
            'Text Case': 'テキストケース',
            'Redraw On': '再描画',
            'Clear Value When Hidden': '非表示のときに値をクリア',
            'Custom Default Value': 'カスタムデフォルト値',
            'Calculated Value': '計算値',
            'Calculate Value on server': 'サーバーで値を計算する',
            'Allow Manual Override of Calculated Value': '計算値の手動オーバーライドを許可',
            Server: 'サーバ',
            Client: 'クライアント',
            None: '無し',
            'Validate On': '検証',
            Required: '必須',
            Unique: 'ユニークな',
            'Minimum Length': '最小の長さ',
            'Maximum Length': '最大長',
            'Minimum Word Length': '最小語長',
            'Maximum Word Length': '最大語長',
            'Regular Expression Pattern': '正規表現パターン',
            'Error Label': 'エラーラベル',
            'Custom Error Message': 'カスタムエラーメッセージ',
            'Custom Validation': 'カスタム検証',
            'JSONLogic Validation': 'JSONLogic検証',
            'Property Name': 'プロパティ名',
            'Field Tags': 'フィールドタグ',
            'Custom Properties': 'カスタムプロパティ',
            'Add Another': 'さらに追加',
            Save: 'セーブ',
            Cancel: 'キャンセル',
            Remove: '削除する',
            Rows: '行',
            Title: '題名',
            Theme: 'テーマ',
            'Data Format': 'データフォーマット',
            'Advanced Logic': '高度なロジック',
            'Advanced Conditions': '高度な条件',
            Simple: 'シンプルな',
            'HTML Attributes': 'HTML属性',
            'PDF Overlay': 'PDFオーバーレイ'
        }
    }
};
