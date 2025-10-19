package types

const (
	ModuleName = "infrastructure"
	StoreKey   = ModuleName
	RouterKey  = ModuleName

	EventTypeDropletProvisioned = "droplet_provisioned"
	EventTypeDropletRemoved     = "droplet_removed"

	AttributeKeyDropletID   = "droplet_id"
	AttributeKeyDropletIP   = "droplet_ip"
	AttributeKeyDropletName = "droplet_name"
	AttributeKeyDropletType = "droplet_type"
)
