import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

interface showModalModel {
  title: String
  message: String
}

@Module({
  name: 'data',
  stateFactory: true,
  namespaced: true,
})
export default class Datas extends VuexModule {
  private mcid: String | null = null
  private uuid: String | null = null
  private modalTitle: String | null = null
  private modalMessage: String | null = null

  /**
   * Gets the Minecraft ID of the user page you are currently browsing.
   * Note: Null is always returned on the top page. Please do not get.
   */
  public get getMinecraftID() {
    return this.mcid
  }

  /**
   * Gets the UUID of the user page you are currently browsing.
   * Note: Null is always returned on the top page. Please do not get.
   */
  public get getUUID() {
    return this.uuid
  }

  /**
   * Gets the Modal Window Title
   */
  public get getModalTitle() {
    return this.modalTitle
  }

  /**
   * Gets the Modal Window Message
   */
  public get getModalMessage() {
    return this.modalMessage
  }

  /**
   * Set the Minecraft ID.
   * @param mcid Minecraft ID
   */
  @Mutation
  public setMinecraftID(mcid: String | null) {
    this.mcid = mcid
  }

  /**
   * Set the UUID.
   * @param uuid UUID
   */
  @Mutation
  public setUUID(uuid: String | null) {
    this.uuid = uuid
  }

  /**
   * Set the Modal Window Title.
   * @param uuid UUID
   */
  @Mutation
  public setModalTitle(title: String) {
    this.modalTitle = title
  }

  /**
   * Show the Modal Window
   * @param title Modal Window Title
   * @param message Modal Window Message
   */
  @Mutation
  public showModal(obj: showModalModel) {
    console.log('showModal', obj.title, obj.message)
    this.modalTitle = obj.title
    this.modalMessage = obj.message
  }

  /**
   * Close Modal Window
   * @param title Modal Window Title
   * @param message Modal Window Message
   */
  @Mutation
  public closeModal() {
    this.modalTitle = null
    this.modalMessage = null
  }
}
