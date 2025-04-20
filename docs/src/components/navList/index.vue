<template>
  <div class="container">
    <div
      id="fileInput"
      class="card"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      :class="{ dragover: isDragging }"
    >
      <label class="labelFile" for="file">
        <p>drag or drop your bookmarks</p>
      </label>
      <input id="file" class="input" type="file" @change="handleFileChange" />
    </div>
    <div class="opts">
      <button @click="handleDownload">Download</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

type BookmarkItem = BookmarkFolder | BookmarkLink;
type BookmarkFolder = {
  type: "folder";
  name: string;
  children: BookmarkItem[];
};
type BookmarkLink = {
  type: "link";
  name: string;
  url: string;
  icon: string | null;
};

// 响应式数据
const isDragging = ref(false);
const bookmarksData = ref<BookmarkItem[] | null>(null);
const statusStyle = reactive({
  color: "#28a745",
});

// 文件处理
const handleFile = async (file: File) => {
  if (!file.name.endsWith(".html") || !file.type.includes("html")) {
    showStatus("❌ 请选择有效的HTML书签文件", true);
    return;
  }

  showStatus(`📁 已选择文件: ${file.name} (${formatFileSize(file.size)})`);

  try {
    // 添加解析状态提示
    showStatus("⏳ 解析文件中...");

    const text = await readFile(file);
    const doc = new DOMParser().parseFromString(text, "text/html");

    // 添加DOM解析校验
    if (!doc.documentElement) {
      throw new Error("无效的HTML结构");
    }

    bookmarksData.value = parseBookmarks(doc);

    if (!bookmarksData.value?.length) {
      throw new Error("解析结果为空");
    }

    showStatus("✅ 解析成功！可下载或预览");
  } catch (error) {
    const err = error as Error;
    showStatus(`❌ 解析失败: ${err.message}`, true);
    bookmarksData.value = null;
  }
};

// 完善文件读取函数
const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result.toString());
      } else {
        reject(new Error("文件内容为空"));
      }
    };

    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsText(file);
  });
};

// 拖放事件处理
const handleDragOver = () => (isDragging.value = true);
const handleDragLeave = () => (isDragging.value = false);
const handleDrop = (e: DragEvent) => {
  handleDragLeave();
  const files = e.dataTransfer?.files;
  if (files?.length) handleFile(files[0]);
};

// 文件选择事件
const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) handleFile(file);
};

// 书签解析逻辑
const parseBookmarks = (doc: Document): BookmarkItem[] => {
  const roots = doc.querySelector("dl");
  if (!roots) throw new Error("无效的书签文件格式");

  const bookmarks: BookmarkItem[] = [];

  const parseNode = (dlElement: HTMLDListElement, parent: BookmarkItem[]) => {
    let currentNode: ChildNode | null = dlElement.firstChild;
  
    while (currentNode) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const element = currentNode as HTMLElement;
        
        if (element.tagName.toLowerCase() === 'dt') {
          const folder = element.querySelector('h3');
          const link = element.querySelector('a');
          const nestedDL = element.querySelector('dl');
  
          // 处理文件夹
          if (folder) {
            const newFolder: BookmarkFolder = {
              type: 'folder',
              name: folder.textContent?.trim() || '未命名文件夹',
              children: []
            };
            parent.push(newFolder);
            
            // 递归处理嵌套的书签
            if (nestedDL) {
              parseNode(nestedDL, newFolder.children);
            }
          }
          // 处理链接
          else if (link) {
            const newLink: BookmarkLink = {
              type: 'link',
              name: link.textContent?.trim() || '未命名书签',
              url: link.href,
              icon: link.getAttribute('icon')
            };
            parent.push(newLink);
          }
        }
      }
      currentNode = currentNode.nextSibling;
    }
  };

  if (roots) parseNode(roots, bookmarks);
  return bookmarks;
};

// 下载功能
// 在 parseBookmarks 函数后添加新的处理逻辑
// 在 BookmarkItem 类型下方添加
interface NavLink {
  icon: string;
  title: string;
  desc: string;
  link: string;
}

// 修改 formatBookmarks 函数返回类型
const formatBookmarks = (items: BookmarkItem[]): NavLink[] => {
  const result: NavLink[] = [];
  
  const traverse = (nodes: BookmarkItem[]) => {
    nodes.forEach(node => {
      if (node.type === 'link') {
        result.push({
          icon: node.icon || '', // 使用书签自带的icon字段
          title: node.name,
          desc: node.name,       // 描述与标题相同
          link: node.url
        });
      } else if (node.type === 'folder' && node.children) {
        traverse(node.children); // 递归处理子项
      }
    });
  };

  traverse(items);
  return result;
};

// 修改后的下载处理函数
const handleDownload = () => {
  if (!bookmarksData.value?.length) {
    showStatus('❌ 请先上传有效的书签文件', true);
    return;
  }

  const formattedData = formatBookmarks(bookmarksData.value);
  
  // 转换为用户需要的导航数据结构
  const navData = {
    title: '导入的书签',
    items: formattedData
  };

  // 生成下载内容
  const jsonData = JSON.stringify(navData, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const filename = `bookmarks-${new Date().toISOString().slice(0, 10)}.json`;
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const showStatus = (message: string, isError = false) => {
  statusStyle.color = isError ? "#dc3545" : "#28a745";
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  width: 40vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vw;
}

.card {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 2rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
}

/*Hover*/
.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.opts {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

/* From Uiverse.io by escannord */
.input {
  max-width: 190px;
  display: none;
}

.labelFile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  text-align: center;
  padding: 5px;
  color: #404040;
  cursor: pointer;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  width: 6vw;
  height: 2vw;
  background-image: linear-gradient(to top, #d8d9db 0%, #fff 80%, #fdfdfd 100%);
  border-radius: 30px;
  border: 1px solid #8f9092;
  transition: all 0.2s ease;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #606060;
  text-shadow: 0 1px #fff;
}

button:hover {
  box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
    0 -6px 4px #fefefe, inset 0 0 3px 3px #cecfd1;
}

button:active {
  box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
    0 -6px 4px #fefefe, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}

#uploadStatus {
  font-size: 2rem;
}
</style>
