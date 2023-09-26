<template>
  <div
    class="antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen place-content-center flex flex-col items-center justify-center text-sm sm:text-base">
    <div class="py-14">
      <div class="grid grid-cols-2 lg:grid-cols-10 gap-6 max-w-[960px] px-4">
        <div class="col-span-2 lg:col-span-10 relative">
          <form class="mb-4 text-center">
            <div class="mb-4">
              <input type="file" id="image-input" accept="image/*" required class="hidden" ref="inputImage" @change="uploadImage">
              <UButton :loading="pending" :ui="buttonUi" icon="i-mdi-cloud-upload-outline" size="lg" block class="bg-blue-500 text-xl hover:bg-blue-700 rounded-full disabled:bg-gray-500" @click="processRemoveBg" label="อัพโหลดรูป" />
            </div>
            

            <div class="grid grid-cols-2 gap-x-4">
              <div>
                <img :src="imageOriginal" v-if="imageOriginal" :class="{ 'blur-sm': pending }">
              </div>
              <div class="self-center">
                <img :src="imageProcessed" class="transition-all bg-[size:25px] bg-white" style="background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA3LjkzNyA3LjkzOCcgaGVpZ2h0PSczMCcgd2lkdGg9JzMwJz48ZyBmaWxsPScjZWVlZmYwJz48cGF0aCBwYWludC1vcmRlcj0nc3Ryb2tlIGZpbGwgbWFya2VycycgZD0nTS4wMTQuMDE0SDMuOTdWMy45N0guMDE0ek0zLjk3IDMuOTY4aDMuOTU0djMuOTU1SDMuOTd6Jy8+PC9nPjwvc3ZnPgo=);" v-if="imageProcessed">
                <p v-if="pending">ระบบกำลังประมวลผล ...</p>

                <a v-if="imageProcessed" :href="imageProcessed" class="bg-blue-500 text-white text-xl hover:bg-blue-700 rounded-sm py-2 px-4">ดาวน์โหลด</a>
              </div>
            </div>
          </form>

          <div id="result-container" class="mt-4">
            <img src="" id="processed-image" class="w-[500px] h-auto" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="isAlert">
      <div class="text-2xl text-red-600">เกิดข้อผิดพลาด</div>
  </UModal>
</template>

<script setup>

  const config = useRuntimeConfig()

  const imageOriginal = ref(null)
  const imageProcessed = ref(null)
  const inputImage = ref()
  const imageData = ref(null)
  const pending = ref(false)

  const isAlert = ref(false)
  const buttonUi = {
    icon: {
      size: {
        lg: 'w-8 h-8'
      }
    }
  }

  const processRemoveBg = () => {
    inputImage.value.click();
  }
  
  const uploadImage = async (e) => {
      imageData.value = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageData.value);
      reader.onload = e =>{
        imageOriginal.value = e.target.result;
      };

      const formData = new FormData();
      formData.append('file', imageData.value);

      const uri = `${config.public.api}/upload-file`

      pending.value = true

      fetch(uri, {
        body: formData,
        method: 'POST',
      })  
      .then(response => response.blob())
      .then(blob => {
        pending.value = false
        imageProcessed.value = URL.createObjectURL(blob)
      })
      .catch(e => isAlert.value = true)
  }
</script>