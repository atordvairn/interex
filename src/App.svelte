<script>
  import './style.css'
  /**
   * logos
   */
  import Cog from '@svicons/boxicons-regular/cog.svelte'
  import Phone from '@svicons/boxicons-regular/phone-call.svelte'

  /**
   * lib imports
   */
  import { db } from './lib/gun'
  import { v4, validate } from 'uuid'

  /**
   * initialisation
   */
  var uuid = v4()
  let pics = []
  let downloaded_pics = []
</script>

<div class="w-full text-xl fixed font-black">
  <div
    class="m-1 p-2 rounded-sm flex text-black bg-white bg-opacity-30
    backdrop-blur-md">
    <div class="ml-3 cursor-pointer">interex</div>
    <div class="m-auto mr-3 cursor-pointer">
      <Cog width="1.2em" />
    </div>
  </div>
</div>
<br />
<br />
<div class="min-h-screen m-2 p-3">
  <div class="flex gap-2">
    <div class="">your uuid -></div>
    <input
      type="text"
      class="disabled w-max input input-sm block"
      value={uuid} />
  </div>
  <div class="flex gap-2">
    {#if pics.length > 0}
      <button
        on:click={() => {
          pics.forEach((pic) => {
            db.get(uuid).get(pic.id).put(pic.base)
            document.getElementById(pic.id.replace(/-/g, '')).remove()
          })
          pics = []
        }}
        class="btn transition duration-500 border-l-blue-600
        hover:border-l-blue-900 border-b-blue-600 hover:border-b-blue-900">
        upload
      </button>
    {:else}
      <label for="file-chooser">
        <span
          class="btn border-l-violet-600 border-b-violet-600 transition
          duration-500 hover:border-l-fuchsia-800 hover:border-b-fuchsia-800">
          upload files
        </span>
      </label>
    {/if}
    <span
      on:click={() => {
        var uuid = prompt('enter your uuid: ')
        downloaded_pics = []
        pics = []
        db.get(uuid)
          .map()
          .once((val, key) => {
            downloaded_pics = [val, ...downloaded_pics]
          })
      }}
      class="ml-auto btn transition duration-500 border-l-rose-500
      hover:border-l-rose-900 border-b-rose-500 hover:border-b-rose-900">
      download files
    </span>
  </div>

  <!-- svelte-ignore missing-declaration -->
  <input
    type="file"
    name="file-chooser"
    id="file-chooser"
    multiple="true"
    class="hidden"
    accept="image/*"
    on:change={async (e) => {
      const files = e.currentTarget.files
      Object.keys(files).forEach((i) => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          pics = [{ id: v4(), base: reader.result }, ...pics]
        }
        reader.readAsDataURL(file)
      })
    }} />
  <div class="flex flex-col justify-center items-center">
    <div class="text-2xl m-2">selected pics</div>
    <div class="p-3 m-1 flex gap-3 flex-wrap">
      {#each pics as pic}
        <img
          src={pic.base}
          id={pic.id.replace(/-/g, '')}
          alt="img"
          class="w-20 object-cover h-20 rounded-sm" />
      {/each}
    </div>
  </div>

  <div class="flex flex-col justify-center items-center">
    <div class="text-2xl m-2">downloaded pics</div>
    <div class="p-3 m-1 flex gap-3 flex-wrap">
      {#each downloaded_pics as pic}
        <img src={pic} alt="img" class="w-20 object-cover h-20 rounded-sm" />
      {/each}
    </div>
  </div>
</div>
<div
  class=" flex h-40 rounded-sm text-black bg-white bg-opacity-20
  backdrop-blur-md m-2 p-1">
  <div class="ml-3">
    <div class="text-2xl font-black">interex</div>
    <div class="font-normal opacity-90 text-xs italic">
      transfer files online
    </div>
  </div>

  <div class="ml-auto w-1/3 mr-3">
    contact:
    <div class="flex gap-1">
      <Phone width="1.2em" />
      8882262636
    </div>
  </div>
</div>
